# Nativescript implementation of coordination between views

The module implements coordination for both platforms iOS and Android.
It uses a producer/consumer pattern based on rxJs.
 
The module augment nativescript view in order to add behaviours:
```typescript  
interface View {
    addBehaviour(behaviour: Behaviour);
} 

export interface Behaviour {
    view: View;
    onCreate?();
    onInitNative?();
    onDispose?();
    onLoaded?();
    onUnloaded?();
}
```

It also provide a Producer interface. The producer is the view that make other views moving (for example a scroll event on scroll view):

```typescript  
export interface Producer {
    init();
    start();
    stop();
    stream: Rx.Subject<ProducerData>;
}
```

The module provide some behaviours. But you can create your own behaviours.

Below the list of behaviour based on a scrollview (or listview):
- FixedHeaderBehavior : hide/show (using translation and opacity) a header based on scroll position
- ExpandableHeaderBehavior: augment the height of the header or reduce it based on scroll position
- ScrollScaleBehavior: scale or unscale a view based on scroll position
- AnchorBehaviour : the textinput is anchored to the top, bottom, middle when keyboard is shown. The input stay anchored even if autogrow is setup


## FixedHeaderBehavior

```typescript
let header: View = null;
let listView: ListView = null;
let behav = new FixedHeaderBehavior(listView);
behav.height = 112;
behav.speedFactor = 1; //HOW MUCH INCREASE OR DECREASE SIZE OF HEADER RELATIVE TO DELTA SCROLL
behav.deferHideFactor = 3; //START HIDING ONLY IF SCROLL IS 3 TIMES GREATER THAN HEADER HEIGHT
behav.deferShowFactor = 1;//START SHOWING ONLY IF SCROLL IS 1 TIMES GREATER THAN HEADER HEIGHT
behav.playOpacity = false; //PLAY WITH HEADER OPACITY WHEN HIDING
behav.maxTranslate = 56;//MAXIMUM TRANSLATION VALUE APPLIED TO HEADER
behav.thresholdFactor = 0.3;//IF HEADER HAS 1/3 OF HIS HEIGHT HIDDEN (SHOWN)=> SO PLAY ANIMATION TO HIDE (SHOW) ALL
header.addBehaviour(behav);
```

## ScrollScaleBehavior

```typescript
let btn: Button = null;
let listView: ListView = null;
    let behavBtn = new ScrollScaleBehavior(listView);
    behavBtn.height = 56;//HEIGHT OF BUTTON
    behavBtn.deferHideFactor = 3;//START HIDING ONLY IF SCROLL IS 3 TIMES GREATER THAN HEADER HEIGHT
    behavBtn.deferShowFactor = 1;//START SHOWING ONLY IF SCROLL IS 1 TIMES GREATER THAN HEADER HEIGHT
    btn.addBehaviour(behavBtn);
```

## ExpandableHeaderBehavior

```typescript
let headerImage: Image = null;
let scrollview: ScrollView = null;
let behav = new ExpandableHeaderBehavior(scrollview);
    behav.height = 400; //MAXIMUM HEIGHT OF THE IMAGE
    behav.disappearAt = 56 + page.getStatusBarHeightDip();//HIDE IMAGE WHEN HEIGHT IS UNDER
    behav.showAnimation = (ex) => {//PLAY AN ANIMATION WHEN SHOWN
        appbar.animate({ backgroundColor: new Color("transparent"), duration: ex.animationDuration, curve: AnimationCurve.easeOut });
    };
    behav.hideAnimation = (ex) => {//PLAY AN ANIMATION WHEN HIDDEN
        appbar.animate({ backgroundColor: new Color("purple"), duration: ex.animationDuration, curve: AnimationCurve.easeIn });
    };
    headerImage.addBehaviour(behav);
```

```xml
<Image src="~/img/logo.png" id="headerImage" stretch="aspectFill" height="400" verticalAlignment="top"/>
<app:AppBarLayout columns="auto,*,auto,auto" rows="auto" id="actionbar">
    <app:AppBarIcon text="list" col="0"/>
    <app:AppBarTitle text="My Application" col="1"/>
    <app:AppBarIcon text="notifications" col="2" />
    <app:AppBarIcon text="search" col="3" tap="openSearch"/>
</app:AppBarLayout> 
```



## AnchorBehaviour

The TextLayout is augmented. This make this new property available:
```typescript
export interface TextLayout{
    anchor:"bottom"|"middle"|"top"|"visible";
} 
```

```xml 
<TextLayout anchor="bottom">
    ...
</TextLayout> 
```


[See all modules here](https://github.com/nabil-mansouri/nativescript-nbmaterial)