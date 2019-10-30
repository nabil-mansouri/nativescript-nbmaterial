# Nativescript implementation of the Material Tabs

The module implement Material tabs on both platforms iOS and Android.
It includes animation effect when indicator is moving.

TabLayout extends the nativescript GridLayout

```typescript 
export function selectTabs(args) {
    console.log("SELECT TABS: ", args.forward, args.index)
}
```
 
TabSep is the indicator
TabTitle extends Label
```xml 
<Page xmlns="http://schemas.nativescript.org/tns.xsd"  xmlns:tab="nativescript-nbmaterial-tabs">
	<tab:Tabs select="selectTabs" colSpan="4" row="1">
			<tab:TabSep/>
			<tab:TabItem>
				<tab:TabTitle text="Mes Chouks" />
			</tab:TabItem>
			<tab:TabItem>
				<tab:TabTitle text="Mes Catégories" />
			</tab:TabItem>
			<tab:TabItem>
				<tab:TabTitle text="Mes Recherches" />
			</tab:TabItem>
			<tab:TabItem>
				<tab:TabTitle text="Mes Pages" />
			</tab:TabItem>
			<tab:TabItem>
				<tab:TabTitle text="Mes Aller" />
			</tab:TabItem>
			<tab:TabItem>
				<tab:TabTitle text="Mes Pourquoi" />
			</tab:TabItem>
		</tab:Tabs>
</Page>

}
```
 
The TabLayout has this interface:
```typescript

export declare class Tabs extends Layout {
    public static selectEvent: string;
    items: TabItem[];
    selectedIndex: number;
    rippleColor: Color;
    barColor: Color;
    unchecked: number;
    activems: number;
    inactivems: number;
    autoselect: boolean;
    scrollable: boolean;
    isActive(item: TabItem);
    setSelected(item: TabItem);
}
export declare class TabItem extends AbsoluteLayout {
    public static tapEvent: string;
    tab: Tabs;
    isActive(): boolean;
    activate(): void;
    unactivate(): void;
}
export declare class TabTitle extends Label {
}
export declare class TabIcon extends Label {
} 
export declare class TabSep extends View {
} 
```

[See all modules here](https://github.com/nabil-mansouri/nativescript-nbmaterial)