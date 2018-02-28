import { Behaviour } from "../behaviours/behaviour";
import { Property } from "tns-core-modules/ui/core/view";
import { TextLayout } from "nativescript-nbmaterial-textinput";
import { View } from "tns-core-modules/ui/core/view";

/**
 * AUGMENT TEXTLAYOUT
 * 
 * OnINIT
 * FIND ANCHOR (below or top)
 * FIND SCROLL PARENT
 * ON FOCUS GET ANCHOR COORDINATE AND SCROLL CONTENT TO 
 * ON FOCUS OUT GET BACK ORIGINAL SCROLL?
 * 
 * ON UNLOAD UNBIND FOCUS
 */

export const anchorProperty: Property<TextLayout, string>;