package com.epitech.myapplication

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.volley.Response
import kotlinx.android.synthetic.main.activity_service.*
import kotlinx.android.synthetic.main.activity_wall.*
import kotlinx.android.synthetic.main.activity_wall.actions_button
import kotlinx.android.synthetic.main.activity_wall.param_button
import androidx.core.os.HandlerCompat.postDelayed
import androidx.core.app.ComponentActivity
import androidx.core.app.ComponentActivity.ExtraData
import androidx.core.content.ContextCompat.getSystemService
import android.icu.lang.UCharacter.GraphemeClusterBreak.T
import android.os.Handler
import androidx.core.os.postDelayed

/*!
 * @class WallActivity
 * @brief class who contains the logic code for the wall activity (pages)
 */
class WallActivity : AppCompatActivity() {

    /*!
     * @brief function called when wall activity is created
     * @param savedInstanceState capacity to restore using this bundle
     */
    val text: ArrayList<String> = ArrayList()
    val colors: ArrayList<String> = ArrayList()
    val content: ArrayList<String> = ArrayList()
    val id: ArrayList<String> = ArrayList()
    val handler = Handler()
    var interval = object : Runnable {
        override fun run() {
            getDisplays()
            handler.postDelayed(this, 5000)//1 sec delay
        }
    }
    var inited = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_wall)
        handler.postDelayed(interval, 0)


        actions_button.setOnClickListener {
            val intent = Intent(this@WallActivity, AppletActivity::class.java)
            startActivity(intent)
            finish()
        }

        param_button.setOnClickListener {
            val intent = Intent(this@WallActivity, ServiceActivity::class.java)
            startActivity(intent)
            finish()
        }

        logout_button.setOnClickListener {
            val intent = Intent(this@WallActivity, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }
    }

    /*!
     * @brief function called when wall activity is finished
     */
    override fun onPause() {
        super.onPause()
        handler.removeCallbacks(interval)
    }

    /*!
     * @brief function called when service activity is created to get all displays triggered by reaction and every 5 sec
     */
    fun getDisplays() {
        val handleRequest = HandlerRequest(this)
        val url = "https://area51.ngrok.io/displays"
        handleRequest.get(
            HandlerRequest.RequestType.ACCESS_TOKEN,
            url,
            Response.Listener{ response ->
                val answerArray = response.getJSONArray("displays")
                text.clear()
                colors.clear()
                content.clear()
                id.clear()
                for (i in 0 until answerArray.length()) {
                    val item = answerArray.getJSONObject(i)
                    text.add(item["title"].toString())
                    colors.add(item["color"].toString())
                    content.add(item["content"].toString())
                    id.add(item["id"].toString())
                }
                if (inited == false) {
                    rv_wall_list.layoutManager = LinearLayoutManager(this)
                    rv_wall_list.adapter = WallAdapter(text, colors, content, id, this)
                    inited = true
                } else {
                    rv_wall_list.adapter?.notifyDataSetChanged()
                }
            },
            Response.ErrorListener { response ->
                println("'${response}'")
                Toast.makeText(this, "Error getting all the displays", Toast.LENGTH_LONG).show()
            }
        )
    }


}
