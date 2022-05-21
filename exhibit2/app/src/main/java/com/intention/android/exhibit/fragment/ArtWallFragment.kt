package com.intention.android.exhibit.fragment

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.intention.android.exhibit.R
import com.intention.android.exhibit.databinding.FragArtwallBinding
import com.kakao.sdk.user.UserApiClient
import com.kakao.usermgmt.StringSet

class ArtWallFragment : Fragment() {

    lateinit var binding : FragArtwallBinding
    private lateinit var nickView : TextView
    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding = FragArtwallBinding.inflate(inflater, container, false)
        nickView = binding.nick
        UserApiClient.instance.me { user, error ->
            nickView.text = "${user?.kakaoAccount?.profile?.nickname} 님"
        }
        return binding.root
    }
}
