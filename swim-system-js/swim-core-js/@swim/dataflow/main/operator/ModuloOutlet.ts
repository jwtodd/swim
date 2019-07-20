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

import {Item, Value} from "@swim/structure";
import {BinaryOutlet} from "./BinaryOutlet";

export class ModuloOutlet extends BinaryOutlet {
  protected evaluate(argument1: Value, argument2: Value): Item {
    return argument1.modulo(argument2);
  }
}