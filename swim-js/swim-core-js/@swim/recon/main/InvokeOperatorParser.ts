// Copyright 2015-2019 SWIM.AI inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {Builder} from "@swim/util";
import {Input, Parser, Diagnostic} from "@swim/codec";
import {Recon} from "./Recon";
import {ReconParser} from "./ReconParser";

/** @hidden */
export class InvokeOperatorParser<I, V> extends Parser<V> {
  private readonly _recon: ReconParser<I, V>;
  private readonly _builder: Builder<I, V> | undefined;
  private readonly _exprParser: Parser<V> | undefined;
  private readonly _argsParser: Parser<V> | undefined;
  private readonly _step: number | undefined;

  constructor(recon: ReconParser<I, V>, builder?: Builder<I, V>,
              exprParser?: Parser<V>, argsParser?: Parser<V>, step?: number) {
    super();
    this._recon = recon;
    this._builder = builder;
    this._exprParser = exprParser;
    this._argsParser = argsParser;
    this._step = step;
  }

  feed(input: Input): Parser<V> {
    return InvokeOperatorParser.parse(input, this._recon, this._builder,
                                      this._exprParser, this._argsParser, this._step);
  }

  static parse<I, V>(input: Input, recon: ReconParser<I, V>, builder?: Builder<I, V>,
                     exprParser?: Parser<V>, argsParser?: Parser<V>, step: number = 1): Parser<V> {
    let c = 0;
    if (step === 1) {
      if (!exprParser) {
        exprParser = recon.parsePrimary(input, builder);
      }
      while (exprParser.isCont() && !input.isEmpty()) {
        exprParser = exprParser.feed(input);
      }
      if (exprParser.isDone()) {
        step = 2;
      } else if (exprParser.isError()) {
        return exprParser.asError();
      }
    }
    do {
      if (step === 2) {
        while (input.isCont() && (c = input.head(), Recon.isSpace(c))) {
          input = input.step();
        }
        if (input.isCont()) {
          if (c === 40/*'('*/) {
            input = input.step();
            step = 3;
          } else {
            return exprParser!;
          }
        } else if (input.isDone()) {
          return exprParser!;
        }
      }
      if (step === 3) {
        while (input.isCont() && (c = input.head(), Recon.isWhitespace(c))) {
          input = input.step();
        }
        if (input.isCont()) {
          if (c === 41/*')'*/) {
            input = input.step();
            const expr = exprParser!.bind();
            exprParser = Parser.done(recon.invoke(expr, recon.extant()));
            step = 2;
            continue;
          } else {
            step = 4;
          }
        } else if (input.isDone()) {
          return Parser.error(Diagnostic.expected(41/*')'*/, input));
        }
      }
      if (step === 4) {
        if (!argsParser) {
          argsParser = recon.parseBlock(input);
        }
        while (argsParser.isCont() && !input.isEmpty()) {
          argsParser = argsParser.feed(input);
        }
        if (argsParser.isDone()) {
          step = 5;
        } else if (argsParser.isError()) {
          return argsParser.asError();
        }
      }
      if (step === 5) {
        while (input.isCont() && (c = input.head(), Recon.isWhitespace(c))) {
          input = input.step();
        }
        if (input.isCont()) {
        if (c === 41/*')'*/) {
            input = input.step();
            const expr = exprParser!.bind();
            const args = argsParser!.bind();
            exprParser = Parser.done(recon.invoke(expr, args));
            argsParser = void 0;
            step = 2;
            continue;
          } else {
            return Parser.error(Diagnostic.expected(41/*')'*/, input));
          }
        } else if (input.isDone()) {
          return Parser.error(Diagnostic.expected(41/*')'*/, input));
        }
      }
      break;
    } while (true);
    return new InvokeOperatorParser<I, V>(recon, builder, exprParser, argsParser, step);
  }
}
