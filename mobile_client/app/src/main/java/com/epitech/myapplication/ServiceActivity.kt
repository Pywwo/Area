package com.epitech.myapplication

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.android.synthetic.main.activity_service.*
import kotlinx.android.synthetic.main.activity_service.actions_button
import android.widget.Toast
import com.android.volley.Response

/*!
 * @class ServiceActivity
 * @brief class who contains the logic code for the service activity (pages)
 */
class ServiceActivity : AppCompatActivity() {

/*!
     * @brief function called when service activity is created
     * @param savedInstanceState capacity to restore using this bundle
     */
    val servicesDescription: ArrayList<String> = ArrayList()
    val servicesLogo: ArrayList<String> = ArrayList()
    val servicesBackground: ArrayList<String> = ArrayList()
    val servicesOauth: ArrayList<String> = ArrayList()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_service)

        addServices()

        actions_button.setOnClickListener {
            val intent = Intent(this@ServiceActivity, AppletActivity::class.java)
            startActivity(intent)
            finish()
        }

        home_button_service.setOnClickListener {
            val intent = Intent(this@ServiceActivity, WallActivity::class.java)
            startActivity(intent)
            finish()
        }

        logout_button_service.setOnClickListener {
            val intent = Intent(this@ServiceActivity, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }
    }

    /*!
        * @brief function called when service activity is created to get all services available from back (api)
     */
    fun addServices() {
        val handleRequest = HandlerRequest(this)
        val url = "https://area51.ngrok.io/services"
        handleRequest.get(
            HandlerRequest.RequestType.ACCESS_TOKEN,
            url,
            Response.Listener{ response ->
                val answerArray = response.getJSONArray("services")
                for (i in 0 until answerArray.length()) {
                    val item = answerArray.getJSONObject(i)
                    servicesDescription.add(item["description"].toString())
                    servicesLogo.add(item["logo"].toString().split(".")[0])
                    servicesBackground.add(item["color"].toString())
                    if (item["oauth"].toString() === "true" && item["oauthed"].toString() === "false")
                        servicesOauth.add(item["link_oauth"].toString())
                    else
                        servicesOauth.add("none")
                }
                rv_services_list.layoutManager = LinearLayoutManager(this)
                rv_services_list.adapter = ServicesAdapter(servicesDescription, servicesLogo, servicesBackground, servicesOauth, this)
            },
            Response.ErrorListener { response ->
                println("'${response}'")
                Toast.makeText(this, "Error loading the services", Toast.LENGTH_LONG).show()}
        )

    }


}
