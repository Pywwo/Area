package com.epitech.myapplication

import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.android.volley.Response
import kotlinx.android.synthetic.main.login_page.*
import kotlinx.android.synthetic.main.register_page.*
import kotlinx.android.synthetic.main.register_page.login
import kotlinx.android.synthetic.main.register_page.password
import kotlinx.android.synthetic.main.register_page.passwordText
import kotlinx.android.synthetic.main.register_page.usernameText
import org.json.JSONObject

/*!
 * @class RegisterActivity
 * @brief class who contains the logic code for the register activity (pages)
 */
class RegisterActivity : AppCompatActivity() {

    /*!
     * @brief function called when login activity is created
     * @param savedInstanceState capacity to restore using this bundle
     */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.register_page)
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
        email.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {}

            override fun onTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {
                if (email.text.toString() == "")
                    emailText.text = "Email"
                else
                    emailText.text = ""
            }

            override fun afterTextChanged(editable: Editable) {
            }
        })

        create_account.setOnClickListener {
            val handleRequest = HandlerRequest(this)
            val url = "https://area51.ngrok.io/user/register"
            val map = HashMap<String, Any>()
            map["username"] = login.text.toString()
            map["password"] = password.text.toString()
            map["email"] = email.text.toString()
            handleRequest.post(
                HandlerRequest.RequestType.SIMPLE_HEADER,
                url,
                map,
                Response.Listener{
                    val intent = Intent(this@RegisterActivity, LoginActivity::class.java)
                    startActivity(intent)
                    finish()},
                Response.ErrorListener { response ->
                    println("'${response}'")
                    Toast.makeText(this, "Error registering you", Toast.LENGTH_LONG).show()}
            )
        }
        loginToApp.setOnClickListener {
            val intent = Intent(this@RegisterActivity, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }
    }
}