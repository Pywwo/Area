package com.epitech.myapplication


import android.content.SharedPreferences
import android.content.Context

/*!
 * @class SharedPreference
 * @brief Class that contain shared preference
 */
class SharedPreference(val context: Context) {
    private val PREFS_NAME = "AccessToken"
    val sharedPref: SharedPreferences = context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)

    /*!
    * @brief fill shared preferences
    * @param string that contain all info needed for imgur api
     */
    fun fillAccesToken(save:String) {
        val delimiter1 = "{\"message\":\"OK\",\"accessToken\":\""
        val delimiter2 = "\"}"
        val parts = save.split(delimiter1, delimiter2)
        val accestok = parts[1]
        val editor: SharedPreferences.Editor = sharedPref.edit()
        editor.putString("AccessToken", accestok)
        editor.apply()
    }
}