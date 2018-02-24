# Nativescript implementation of the Material Bottom Navigation

The module implement Bottom Navigation Layout on both iOS and Android.  
You can add a shit animation to nav items by adding "shifted" class to the component.
Icon and Title extends nativescript Label.
You can use a font library like material-icons or font-awesome.

If you want to use it as a root navigator your app.ts must looks like:

```typescript 
import "./bundle-config";
import {startWithMenu} from 'nativescript-nbmaterial-bottomnav';

startWithMenu({ moduleName: 'home/home-page' }, "menu/menu-page");
```
"moduleName" is your first screen.


And menu-page looks like:

```xml 
<Page xmlns="http://schemas.nativescript.org/tns.xsd" 
xmlns:bnav="nativescript-nbmaterial-bottomnav">
	<bnav:BottomNavigation autoselect="false" select="selectNav" id="bottomnav" class="shifted">
		<bnav:BottomNavigationItem>
			<bnav:Icon text="dashboard"  />
			<bnav:Title text="Home"/>
		</bnav:BottomNavigationItem>
		<bnav:BottomNavigationItem>
			<bnav:Icon text="add"/>
			<bnav:Title text="Ajouter" />
		</bnav:BottomNavigationItem>
		<bnav:BottomNavigationItem>
			<bnav:Icon text="favorite"/>
			<bnav:Title text="Consulter" />
		</bnav:BottomNavigationItem> 
	</bnav:BottomNavigation>  
</Page>

}
```


[See all modules here](https://github.com/nabil-mansouri/nativescript-nbmaterial)