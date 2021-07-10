package com.shopcart_react;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatDelegate;

import com.facebook.react.ReactActivity;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "shopcart_react";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    AppCompatDelegate.setDefaultNightMode(AppCompatDelegate.MODE_NIGHT_NO);
    SplashScreen.show(this,R.style.SplashScreenTheme);
    super.onCreate(savedInstanceState);
  }
}
