---
title: CSS styles
excerpt: ''
deprecated: false
hidden: true
metadata:
  title: ''
  description: ''
  robots: index
next:
  description: ''
---
### Font styles

If you want to use your own font family, you can override our fonts. An example is presented in the code snippet below:

```kotlin
<style name="YunoRegularFont">
    <item name="android:fontFamily">YOUR REGULAR FONT FILE ( EX: @font/inter_regular.ttf)</item>
</style>

<style name="YunoMediumFont">
<item name="android:fontFamily">YOUR MEDIUM FONT FILE ( EX: @font/inter_medium.ttf)</item>
</style>

<style name="YunoBoldFont">
<item name="android:fontFamily">YOUR BOLD FONT FILE ( EX: @font/inter_bold.ttf)</item>
</style>
```

> These are our font styles you can override:\
> -YunoRegularFont -YunoMediumFont -YunoBoldFont

### Button styles

If you want to use your own button styles, you can override our styles. An example is presented in the code snippet below:

```kotlin
<style name="Button.Normal.Purple">
    <item name="android:background">YOUR OWN COLOR ( EX: HEXCODE OR RESOURCE )</item>
    <item name="android:textColor">YOUR OWN COLOR ( EX: HEXCODE OR RESOURCE )</item>
    <item name="android:fontFamily">YOUR FONT FILE ( EX: @font/inter_regular.ttf)</item>
</style>
```

> These are our button styles you can override:\
> -Button.Normal.White\
> -Button.Normal.Green\
> -Button.Normal.Purple\
> -Button.Normal.Purple.Big

### Color styles

If you want to use your own color styles, you can override our styles. An example is presented in the code snippet below:

```kotlin

<color name="yuno_purple_light">YOUR OWN COLOR ( EX: HEXCODE OR RESOURCE )</color>
```

> These are our color styles you can override:\
> -yuno\_purple\_light
