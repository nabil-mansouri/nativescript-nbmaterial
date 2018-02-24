# Nativescript implementation of the Material AppBarLayout

The module implement AppBarLayout on both iOS and Android. 
The layout extends the nativescript GridLayout.
Use "nativescript-nbmaterial-coordinator" to make animation effects like sticky header or hide header on scroll.
AppBarIcon and AppBarTitle extends nativescript Label.
You can use a font library like material-icons or font-awesome.

```xml
  <!--
The markup in NativeScript apps contains a series of user interface components, each
of which NativeScript renders with a platform-specific iOS or Android native control.
You can find a full list of user interface components you can use in your app at
https://docs.nativescript.org/ui/components.
-->
<Page xmlns="http://schemas.nativescript.org/tns.xsd" 
xmlns:app="nativescript-nbmaterial-appbar" navigatingTo="onNavigatingTo">
	 <GridLayout rows="*" columns="*" id="root">  
		<app:AppBarLayout columns="auto,*,auto,auto" rows="auto,auto" id="actionbar">
			<app:AppBarIcon text="list" col="0"/>
			<app:AppBarTitle text="My Application" col="1"/>
			<app:AppBarIcon text="notifications" col="2"/>
			<app:AppBarIcon text="search" col="3" tap="openSearch"/> 
		</app:AppBarLayout>  
	</GridLayout>
</Page>

}
```


[See all modules here](https://github.com/nabil-mansouri/nativescript-nbmaterial)