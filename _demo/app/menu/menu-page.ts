import { Page } from 'ui/page';
import { path, knownFolders } from "file-system";
import { resolveFileName } from "file-system/file-name-resolver";
import { BottomNavigationFrame, BottomNavigation, BottomNavigationItem, Icon, Title, SelectItemEventData } from "nativescript-nbmaterial-bottomnav";
import "nativescript-nbmaterial-bottomnav/start";//AUGMENT FRAME AND NAV ENTRY


export function selectNav(args: SelectItemEventData) {
    console.log("NAVIGATE TO : ", args.index)
    switch (args.index) {
        case 0:
            console.log("NAVIGATE TO : LISTPAGE")
            args.nextEntry = ({ moduleName: "home/home-page" });
            break;
        case 1:
            console.log("NAVIGATE TO : FORMsPAGE")
            args.nextEntry = ({ moduleName: "form/form-page" });
            break;
        case 2:
            console.log("NAVIGATE TO : SHOWPAGE")
            args.nextEntry = ({ moduleName: "show/show-page" });
            break;
        case 3:
            args.nextEntry = ({ moduleName: "form/form-page" });
            break;
        case 4:
        default:
            return null;
    }
}
//TODO design list
//TODO bloquer appbar behaviour pendant pullrefresh?
//TODO atenttion status bar drawn et sdk version
//TODO snackbar   
//TODO remplacer 56 (dans appbar commons)par valeur behaviour => transformer en regle css behaviour?

//TODO ios status bar opacity
//TODO ios tester anchor textfield (tous)
//TODO ios tester parallax header et fixed header appbarlayout status bar (faire color transparent?)