package com.epitech.myapplication

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.widget.Toast
import com.android.volley.Response
import kotlinx.android.synthetic.main.login_page.*

/*!
 * @class LoginActivity
 * @brief class who contains the logic code for the login activity (pages)
 */
class LoginActivity : AppCompatActivity() {

    /*!
     * @brief function called when login activity is created
     * @param savedInstanceState capacity to restore using this bundle
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.login_page)
        login.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {}

            override fun onTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {
                if (login.text.toString() == "")
                    usernameText.text = "Username"
                else
                    usernameText.text = ""
            }

            override fun afterTextChanged(editable: Editable) {
            }
        })
        password.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {}

            override fun onTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {
                if (password.text.toString() == "")
                    passwordText.text = "Password"
                else
                    passwordText.text = ""
            }

            override fun afterTextChanged(editable: Editable) {
            }
        })
        create_account_button.setOnClickListener {
            val intent = Intent(this@LoginActivity, RegisterActivity::class.java)
            startActivity(intent)
            finish()
        }
        login_button.setOnClickListener {
            val handleRequest = HandlerRequest(this)
            val url = "https://area51.ngrok.io/user/login"
            val map = hashMapOf<String, Any>(Pair("username", login.text.toString()), Pair("password", password.text.toString()))
            handleRequest.post(
                HandlerRequest.RequestType.SIMPLE_HEADER,
                url,
                map,
                Response.Listener{ response ->
                    val info = SharedPreference(this)
                    info.fillAccesToken(response)
                    val intent = Intent(this@LoginActivity, WallActivity::class.java)
                    startActivity(intent)
                    finish()},
                Response.ErrorListener { response ->
                    println("'${response}'")
                    Toast.makeText(this, "Error : Invalid login or password", Toast.LENGTH_LONG).show()}
            )
        }
    }
}
