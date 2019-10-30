# Nativescript implementation of the Material SearchBar

The module implement Material Search Bar on both platforms iOS and Android.
You can use it as a modal (fullscreen) or as a simple component.
It also display results.

TabLayout extends the nativescript GridLayout

```typescript 
export const searchAdapter: SearchCallback = {
    onCancel() {
        while (searchBar.results.length) {
            searchBar.results.pop();
        }
    },
    onClear() {
        while (searchBar.results.length) {
            searchBar.results.pop();
        }
    },
    onSubmit() {
        while (searchBar.results.length) {
            searchBar.results.pop();
        }
    },
    onText(text) {
        if (text && (text.startsWith("N") || text.startsWith("n"))) {
            for (let i = 0; i < 10; i++) { 
                searchBar.results.push({ label: text + " " + i })
            }
        } else {
            while (searchBar.results.length) {
                searchBar.results.pop();
            }
        }
    }
}
let searchBar =  page.getViewById("searchbar");
searchBar.register(searchAdapter)
```
 
```xml 
<Page xmlns="http://schemas.nativescript.org/tns.xsd"  xmlns:sea="nativescript-nbmaterial-search">
    <sea:SearchBarModal id="searchbar">
        <sea:SearchBarModal.barTemplate>
            <sea:SearchBar>
                <sea:SearchField/>
                <sea:SearchIcon text="arrow_back" action="cancel" position="left"/>
                <sea:SearchIcon text="mic" action="speech" position="right"/>
                <sea:SearchIcon text="clear" action="clear" position="right"/>
            </sea:SearchBar>
        </sea:SearchBarModal.barTemplate>
        <sea:SearchBarModal.resultTemplate>
            <StackLayout  paddingTop="15">
                <ListView items="{{results}}"  itemTap="searchTap">
                    <ListView.itemTemplate>
                        <Label text="{{label}}" textWrap="true" />
                    </ListView.itemTemplate>
                </ListView>
            </StackLayout>
        </sea:SearchBarModal.resultTemplate>
    </sea:SearchBarModal>
</Page>

}
``` 
The Searchbar has this interface:
```typescript
export interface SearchCallback {
    onClear();
    onCancel();
    onText(text: string);
    onSubmit(text: string);
}
export class SearchBar extends GridLayout {
    callbacks: SearchCallback[];
    register(c: SearchCallback);
    unregister(toDel: SearchCallback);
    cancel();
    clear();
    submit(text: string);
    changed(text: string);
    speech();
}
export class SearchBarModal extends View {
    hide();
    show();
    register(c: SearchCallback);
    unregister(toDel: SearchCallback);
    readonly opened: boolean;
    newPage: Page;
    results: ObservableArray<any>;
}

export class SearchField extends TextField {
    bar: SearchBar;
}
export class SearchIcon extends Label {
    position: "left" | "right";
    action: "submit" | "cancel" | "speech";
    bar: SearchBar;
} 
```

[See all modules here](https://github.com/nabil-mansouri/nativescript-nbmaterial)