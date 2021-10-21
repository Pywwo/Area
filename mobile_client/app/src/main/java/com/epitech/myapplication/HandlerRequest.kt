package com.epitech.myapplication

import android.content.Context
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.google.gson.Gson
import org.json.JSONObject

/*!
 * @class Handler Request
 * @brief class who contains the request for the application, it uses the volley lib
 */
class HandlerRequest (context: Context) {
    enum class RequestType {
        ACCESS_TOKEN,
        SIMPLE_HEADER
    }
    private val queue = Volley.newRequestQueue(context)
    private val accessToken = context.getSharedPreferences("AccessToken", Context.MODE_PRIVATE).getString("AccessToken", null)

    /*!
     * @brief return the request header for authentication
     * @param type of the request
     */
    private fun requestHeader(type: RequestType) : HashMap<String, String> {
        val headers = HashMap<String, String>()
        if (type == RequestType.ACCESS_TOKEN)
            headers["x-access-token"] = "$accessToken"
        return headers
    }

    /*!
     * @brief get request
     * @param type of the request
     * @param url of the request
     * @param listener if the callback when the request succeed
     * @param error listener if the callback when the request fail
     */
    fun get(type: RequestType, url: String, listener: Response.Listener<JSONObject>, errorListener: Response.ErrorListener) {
        val request = object : JsonObjectRequest(Method.GET, url, null, listener, errorListener) {
            override fun getHeaders(): MutableMap<String, String> {
                return requestHeader(type)
            }
        }
        queue.add(request)
    }

    /*!
     * @brief post request
     * @param type of the request
     * @param url of the request
     * @param hashMap contains the params of the request
     * @param listener if the callback when the request succeed
     * @param error listener if the callback when the request fail
     */
    fun post(type: RequestType, url: String, hashMap: HashMap<String, Any>, listener: Response.Listener<String>, errorListener: Response.ErrorListener) {
        val request = object : StringRequest(Method.POST, url, listener, errorListener) {
            override fun getHeaders(): MutableMap<String, String> {
                return requestHeader(type)
            }
            override fun getBody(): ByteArray {
                val jsonString = Gson().toJson(hashMap)
                return jsonString.toByteArray()
            }
            override fun getBodyContentType(): String {
                return "application/json"
            }
        }
        queue.add(request)
    }

    fun put(type: RequestType, url: String, hashMap: HashMap<String, String>, listener: Response.Listener<String>, errorListener: Response.ErrorListener) {
        val request = object : StringRequest(Method.PUT, url, listener, errorListener) {
            override fun getHeaders(): MutableMap<String, String> {
                return requestHeader(type)
            }
            override fun getBody(): ByteArray {
                val jsonString = Gson().toJson(hashMap)
                return jsonString.toByteArray()
            }
            override fun getBodyContentType(): String {
                return "application/json"
            }
        }
        queue.add(request)
    }

    /*!
     * @brief delete request
     * @param type of the request
     * @param url of the request
     * @param listener if the callback when the request succeed
     * @param error listener if the callback when the request fail
     */
    fun del(type: RequestType, url: String, listener: Response.Listener<String>, errorListener: Response.ErrorListener) {
        val request = object : StringRequest(Method.DELETE, url, listener, errorListener) {
            override fun getHeaders(): MutableMap<String, String> {
                return requestHeader(type)
            }
        }
        queue.add(request)
    }
}