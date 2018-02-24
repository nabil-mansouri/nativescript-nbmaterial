# Nativescript implementation of the Recycler View

The recycler view is only available in Android. It has better performance than the default list view when the datasource size increase.
on iOS it uses the defult ListView implementation.
 
```xml 
<Page xmlns="http://schemas.nativescript.org/tns.xsd"  xmlns:rec="nativescript-nbmaterial-recycler">
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
</Page>

}
```
 
The RecyclerView has this interface:
```typescript
export declare class RecyclerView extends ListView {
    public static itemLongTapEvent;
    public recycler: any;
} 
```

[See all modules here](https://github.com/nabil-mansouri/nativescript-nbmaterial)