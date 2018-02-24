# Nativescript implementation of the Material Bottom Sheet

The module implement Bottom Sheet Layout on both iOS and Android.  
There is an animation effect on open and on close.

```typescript 
bottomSheet = page.getViewById("bottomsheet");
export function showBS() { 
    bottomSheet.show();
}
export function hideBS() {
    bottomSheet.hide();
}
```
 

```xml 
<Page xmlns="http://schemas.nativescript.org/tns.xsd" 
xmlns:bnav="nativescript-nbmaterial-bottomnav">
	<bs:BottomSheetModal id="bottomsheet">
			<bs:BottomSheetModal.template>
				<GridLayout rows="auto" columns="auto">
					<StackLayout>
						<Label text="Ready?" textWrap="true" />
						<Label text="Steady?" textWrap="true" />
						<Label text="Go!" textWrap="true" />
						<Label text="Cool" textWrap="true" />
						<Button text="HIDE BS" tap="hideBS" class="btn btn-primary btn-active"/> 
					</StackLayout>
				</GridLayout>
			</bs:BottomSheetModal.template>
		</bs:BottomSheetModal>
</Page>

}
```


[See all modules here](https://github.com/nabil-mansouri/nativescript-nbmaterial)