# Nativescript implementation of PullToRefresh behaviour

The module implement Material calendar on both platforms iOS and Android.
It is possible to refresh on both direction (top and bottom).
You must use the recycler package in order to use the pulltorefresh component. 

```xml 
<Page xmlns="http://schemas.nativescript.org/tns.xsd"  xmlns:ti="nativescript-nbmaterial-pullrefresh" xmlns:pullr="nativescript-nbmaterial-pullrefresh">
 	<pullr:PullToRefresh direction="both" id="pullrefresh">
			<rec:RecyclerView row="0"  items="{{source}}" id="list" itemTap="tapItem" itemLongTap="tapLongItem" itemTemplateSelector="templateSelector">
				<rec:RecyclerView.itemTemplates>
					<template key="zero">
						<Label text="{{ text }}" backgroundColor="green" />
					</template>
					<template key="un">
						<Label text="{{ text }}" backgroundColor="white" paddingTop="10"  paddingBottom="10" />
					</template>
					<template key="deux">
						<Label text="{{ text }}" backgroundColor="red"/>
					</template>
				</rec:RecyclerView.itemTemplates>
			</rec:RecyclerView>
		</pullr:PullToRefresh> 
</Page>

}
```
 
The PullToRefresh has this interface:
```typescript

export declare class PullToRefresh extends View {
    direction: "both" | "bottom" | "top";
    public static refreshTopEvent;
    public static refreshBottomEvent; 
    public androidBottomRefreshView: ActivityIndicator;
    startRefreshTop();
    startRefreshBottom();
    stopRefreshTop();
    stopRefreshBottom();
} 
```

[See all modules here](https://github.com/nabil-mansouri/nativescript-nbmaterial)