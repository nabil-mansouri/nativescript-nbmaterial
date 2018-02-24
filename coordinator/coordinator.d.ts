import { Behaviour } from "./behaviours/behaviour";
 
declare module "tns-core-modules/ui/core/view" {
    interface View {
        addBehaviour(behaviour: Behaviour);
    }
}