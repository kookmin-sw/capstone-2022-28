package com.intention.android.exhibit.activity
import android.app.Application
import com.kakao.sdk.common.KakaoSdk

class GlobalApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        KakaoSdk.init(this, "14ab8029e299b0713c272c37d4919964")
    }
}