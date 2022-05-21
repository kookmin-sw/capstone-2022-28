package com.intention.android.exhibit.activity

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import com.intention.android.exhibit.R
import com.intention.android.exhibit.databinding.ActivityMainBinding
import com.intention.android.exhibit.fragment.*
import com.kakao.sdk.user.UserApiClient
import com.kakao.usermgmt.StringSet.nickname

class MainActivity : AppCompatActivity() {

    private lateinit var binding : ActivityMainBinding
    private val artFragment = ArtWallFragment()
    private val individualFragment = IndividualFragment()
    private val myartFragment = MyartFragment()
    private val myFragment = MyFragment()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        replaceFragment(artFragment)


        binding.bnvMain.setOnItemSelectedListener { item ->
            when (item.itemId) {
                R.id.frag_artwall -> {
                    Log.d("changeFrag", "${item.itemId}")
                    replaceFragment(artFragment)
                    true
                }
                R.id.frag_individual -> {
                    Log.d("changeFrag", "${item.itemId}")
                    replaceFragment(individualFragment)
                    true
                }
                R.id.frag_myart -> {
                    Log.d("changeFrag", "${item.itemId}")
                    replaceFragment(myartFragment)
                    true
                }
                R.id.frag_my -> {
                    Log.d("changeFrag", "${item.itemId}")
                    replaceFragment(myFragment)
                    true
                }
                else -> {
                    Log.d("changeFrag", "${item.itemId}")
                    false
                }
            }
        }
    }
    public fun replaceFragment(fragment: Fragment) {
        val tran = supportFragmentManager.beginTransaction()
        tran.replace(R.id.fl_container, fragment)
        tran.commit()
    }
}