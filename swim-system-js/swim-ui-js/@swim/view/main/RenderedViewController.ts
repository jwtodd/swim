// Copyright 2015-2020 SWIM.AI inc.
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

import {PointR2, BoxR2} from "@swim/math";
import {View} from "./View";
import {AnimatedViewController} from "./AnimatedViewController";
import {RenderedViewContext} from "./RenderedViewContext";
import {RenderedView} from "./RenderedView";
import {RenderedViewObserver} from "./RenderedViewObserver";

export interface RenderedViewController<V extends RenderedView = RenderedView> extends AnimatedViewController<V>, RenderedViewObserver<V> {
  readonly view: V | null;

  setView(view: V | null): void;

  viewWillSetKey(key: string | null, view: V): void;

  viewDidSetKey(key: string | null, view: V): void;

  viewWillSetParentView(parentView: View | null, view: V): void;

  viewDidSetParentView(parentView: View | null, view: V): void;

  viewWillInsertChildView(childView: View, targetView: View | null | undefined, view: V): void;

  viewDidInsertChildView(childView: View, targetView: View | null | undefined, view: V): void;

  viewWillRemoveChildView(childView: View, view: V): void;

  viewDidRemoveChildView(childView: View, view: V): void;

  viewWillMount(view: V): void;

  viewDidMount(view: V): void;

  viewWillUnmount(view: V): void;

  viewDidUnmount(view: V): void;

  viewWillUpdate(viewContext: RenderedViewContext, view: V): void;

  viewDidUpdate(viewContext: RenderedViewContext, view: V): void;

  viewWillCompute(viewContext: RenderedViewContext, view: V): void;

  viewDidCompute(viewContext: RenderedViewContext, view: V): void;

  viewWillAnimate(viewContext: RenderedViewContext, view: V): void;

  viewDidAnimate(viewContext: RenderedViewContext, view: V): void;

  viewWillLayout(viewContext: RenderedViewContext, view: V): void;

  viewDidLayout(viewContext: RenderedViewContext, view: V): void;

  viewWillScroll(viewContext: RenderedViewContext, view: V): void;

  viewDidScroll(viewContext: RenderedViewContext, view: V): void;

  viewWillRender(viewContext: RenderedViewContext, view: V): void;

  viewDidRender(viewContext: RenderedViewContext, view: V): void;

  viewWillUpdateChildViews(viewContext: RenderedViewContext, view: V): void;

  viewDidUpdateChildViews(viewContext: RenderedViewContext, view: V): void;

  viewWillSetHidden(hidden: boolean, view: V): boolean | void;

  viewDidSetHidden(hidden: boolean, view: V): void;

  viewWillSetCulled(culled: boolean, view: V): boolean | void;

  viewDidSetCulled(culled: boolean, view: V): void;

  viewWillSetBounds(bounds: BoxR2, view: V): BoxR2 | void;

  viewDidSetBounds(newBounds: BoxR2, oldBounds: BoxR2, view: V): void;

  viewWillSetAnchor(anchor: PointR2, view: V): PointR2 | void;

  viewDidSetAnchor(newAnchor: PointR2, oldAnchor: PointR2, view: V): void;
}
