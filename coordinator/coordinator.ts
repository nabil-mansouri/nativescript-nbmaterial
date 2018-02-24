import { View } from "ui/core/view";
import { Behaviour } from "./behaviours/behaviour";

declare module "tns-core-modules/ui/core/view" {
    interface View {
        addBehaviour(behaviour: Behaviour);
    }
}

View.prototype["behaviours"] = [];

View.prototype["addBehaviour"] = function (behaviour: Behaviour) {
    const self: View = this;
    behaviour.view = self;
    this.behaviours.push(behaviour);
    if (behaviour.onLoaded) {
        self.on("loaded", () => {
            behaviour.view = self;
            behaviour.onLoaded();
        })
    }
    self.on("unloaded", () => {
        if (behaviour.onUnloaded) {
            behaviour.onUnloaded();
        }
        behaviour.view = null;
    })
}

const oldCreate = View.prototype.createNativeView;
View.prototype.createNativeView = function () {
    let created = oldCreate.call(this);
    this.behaviours.forEach((b: Behaviour) => {
        b.onCreate && b.onCreate();
    });
    return created;
}

const oldInit = View.prototype.initNativeView;
View.prototype.initNativeView = function () {
    oldInit.call(this);
    this.behaviours.forEach((b: Behaviour) => {
        b.onInitNative && b.onInitNative();
    });
}

const oldDispose = View.prototype.disposeNativeView;
View.prototype.disposeNativeView = function () {
    oldDispose.call(this);
    this.behaviours = [];
}