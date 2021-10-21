package com.epitech.myapplication

import android.app.TimePickerDialog
import android.content.Intent
import android.icu.text.SimpleDateFormat
import android.icu.util.Calendar
import android.os.Build
import android.os.Bundle
import android.text.Editable
import android.text.TextWatcher
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.PopupWindow
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.isInvisible
import androidx.recyclerview.widget.LinearLayoutManager
import com.android.volley.Response
import kotlinx.android.synthetic.main.activity_actions.*
import kotlinx.android.synthetic.main.add_applet.view.*


class AppletActivity : AppCompatActivity() {

    val actionsName: ArrayList<String> = ArrayList()
    val addAppletName: ArrayList<String> = ArrayList()
    val addReactionName: ArrayList<String> = ArrayList()
    var switch = true
    var color = ""
    var valueForTextField = HashMap<Int, String>()
    var actionType = ""
    var pickerValue = 0
    var hourPicker = 0
    var minPicker = 0
    var service = ""
    val saveJsonDescription = HashMap<String, String>()
    val saveJsonParams = HashMap<String, Any>()
    val saveJsonOutputs = HashMap<String, Any>()
    val saveJsonService = HashMap<String, String>()
    val actionsLogo: ArrayList<String> = ArrayList()
    val reactionsLogo: ArrayList<String> = ArrayList()
    val actionsSwitch: ArrayList<String> = ArrayList()
    val actionsBackground: ArrayList<Int> = ArrayList()
    val actionsId: ArrayList<String> = ArrayList()
    val actionsDescription: ArrayList<String> = ArrayList()
    var createAppletValueRequest = HashMap<String, Any>()
    var step = "action"
    private var window1:PopupWindow? = null

    @RequiresApi(Build.VERSION_CODES.N)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_actions)
        window1 = PopupWindow(this)
        val view = layoutInflater.inflate(R.layout.add_applet, null)
        window1!!.contentView = view
        window1!!.setFocusable(true)
        addServices()
        setButton(window1!!)
        setTextField("", "", "", "")

        window1?.contentView?.switch1?.setOnCheckedChangeListener { _, isChecked ->
            switch = isChecked
        }

        home_button_action.setOnClickListener {
            val intent = Intent(this@AppletActivity, WallActivity::class.java)
            startActivity(intent)
            finish()
        }

        param_button.setOnClickListener {
            val intent = Intent(this@AppletActivity, ServiceActivity::class.java)
            startActivity(intent)
            finish()
        }

        logout_button_action.setOnClickListener {
            val intent = Intent(this@AppletActivity, LoginActivity::class.java)
            startActivity(intent)
            finish()
        }

        window1?.contentView?.pickTimeBtn?.setOnClickListener {
            val cal = Calendar.getInstance()
            val timeSetListener = TimePickerDialog.OnTimeSetListener { timePicker, hour, minute ->
                cal.set(Calendar.HOUR_OF_DAY, hour)
                cal.set(Calendar.MINUTE, minute)
                val delimiter = ":"
                val parts = SimpleDateFormat("HH:mm").format(cal.time).split(delimiter)
                hourPicker = parts[0].toInt()
                minPicker = parts[1].toInt()
            }
            TimePickerDialog(this, timeSetListener, cal.get(Calendar.HOUR_OF_DAY), cal.get(Calendar.MINUTE), true).show()
        }

        window1?.contentView?.title?.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {}

            override fun onTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {
            }

            override fun afterTextChanged(editable: Editable) {
            }
        })

        window1?.contentView?.content?.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {}

            override fun onTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {
            }

            override fun afterTextChanged(editable: Editable) {
            }
        })

        window1?.contentView?.field3?.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {}

            override fun onTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {
            }

            override fun afterTextChanged(editable: Editable) {
            }
        })

        window1?.contentView?.field4?.addTextChangedListener(object : TextWatcher {
            override fun beforeTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {}

            override fun onTextChanged(charSequence: CharSequence, i: Int, i1: Int, i2: Int) {
            }

            override fun afterTextChanged(editable: Editable) {
            }
        })

        window1?.contentView?.number_picker?.minValue  = 0
        window1?.contentView?.number_picker?.maxValue  = 10000

        window1?.contentView?.number_picker?.wrapSelectorWheel  = false

        window1?.contentView?.number_picker?.setOnValueChangedListener { picker, oldVal, newVal ->
            pickerValue = newVal
        }
        window1?.contentView?.spinner1?.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onNothingSelected(parent: AdapterView<*>?) {

            }

            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long)
            {
                clearDisplay()
                if (step == "action") {
                    createAppletValueRequest.clear()
                    for ((key, value) in saveJsonDescription) {
                        if (parent?.getItemAtPosition(position) as String == key) {
                            actionType = parent.getItemAtPosition(position) as String
                            window1?.contentView?.textView2?.text = value
                            if (parent.getItemAtPosition(position) as String == "new_game_with_requested_kills")
                                new_game_with_requested_kills()
                            if (parent.getItemAtPosition(position) as String == "it_is_X_am")
                                it_is_X_am()
                            if (parent.getItemAtPosition(position) as String == "one_day_per_week")
                                one_day_per_week()
                            if (parent.getItemAtPosition(position) as String == "every_X_hour")
                                every_X_hour()
                            if (parent.getItemAtPosition(position) as String == "receive_a_mail_from_X")
                                receive_a_mail_from_X()
                            if (parent.getItemAtPosition(position) as String == "new_video_from_subscribed_channel")
                                new_video_from_subscribed_channel()
                            if (parent.getItemAtPosition(position) as String == "new_push_on_repo")
                                new_push_on_repo()
                            if (parent.getItemAtPosition(position) as String == "repository_modified")
                                repository_modified()
                            if (parent.getItemAtPosition(position) as String == "receive_a_mail")
                                receive_a_mail()
                            if (parent.getItemAtPosition(position) as String == "update_on_subbed_channel")
                                update_on_subbed_channel()
                            if (parent.getItemAtPosition(position) as String == "new_game_with_requested_multi_kills")
                                new_game_with_requested_multi_kills()
                            if (parent.getItemAtPosition(position) as String == "folder_uploaded")
                                folder_uploaded()
                            if (parent.getItemAtPosition(position) as String == "file_or_folder_deleted")
                                file_or_folder_deleted()
                        }
                    }
                } else if (step == "reaction") {
                    for ((key, value) in saveJsonOutputs) {
                        var save = "Tags = "
                        if (createAppletValueRequest["action_name"] == key) {
                            val delimiter1 = "[{\"name\":\""
                            val delimiter2 = "\",\"type\":\""
                            val delimiter3 = "\"},{\"name\":\""
                            val delimiter4 = "\"}]"
                            val parts = value.toString().split(delimiter1, delimiter2, delimiter3, delimiter4)
                            val strs2:List<String> = parts.filter { it != "" }
                            for (i in strs2.indices) {
                                if (i % 2 == 0) {
                                    save += "@"
                                    save += strs2[i]
                                    save += " / "
                                }
                            }
                            window1?.contentView?.textViewTag?.text = save
                        }
                    }
                    for ((key, value) in saveJsonDescription) {
                        if (parent?.getItemAtPosition(position) as String == key) {
                            actionType = parent.getItemAtPosition(position) as String
                            window1?.contentView?.textView2?.text = value
                            parent.getItemAtPosition(position) as String
                            if (parent.getItemAtPosition(position) as String == "display")
                                display()
                            if (parent.getItemAtPosition(position) as String == "send_mail")
                                send_mail()
                            if (parent.getItemAtPosition(position) as String == "comment_a_video")
                                comment_a_video()
                            if (parent.getItemAtPosition(position) as String == "like_a_video")
                                like_a_video()
                            if (parent.getItemAtPosition(position) as String == "comment_on_issue")
                                comment_on_issue()
                            if (parent.getItemAtPosition(position) as String == "comment_on_pull_request")
                                comment_on_pull_request()
                            if (parent.getItemAtPosition(position) as String == "delete_file")
                                delete_file()
                            if (parent.getItemAtPosition(position) as String == "duplicate_file")
                                duplicate_file()
                            if (parent.getItemAtPosition(position) as String == "dislike_a_video")
                                dislike_a_video()
                            if (parent.getItemAtPosition(position) as String == "unrate_a_video")
                                unrate_a_video()
                            if (parent.getItemAtPosition(position) as String == "area_send_mail")
                                area_send_mail()
                        }
                    }
                }
            }
        }

        window1?.contentView?.spinner3?.onItemSelectedListener = object : AdapterView.OnItemSelectedListener {
            override fun onNothingSelected(parent: AdapterView<*>?) {

            }

            override fun onItemSelected(parent: AdapterView<*>?, view: View?, position: Int, id: Long) {
                if (parent?.getItemAtPosition(position) as String == "blue") {
                    color = "#314DE1"
                } else if (parent?.getItemAtPosition(position) as String == "green") {
                    color = "#42f572"
                } else if (parent?.getItemAtPosition(position) as String == "red") {
                    color = "#ff121a"
                } else if (parent?.getItemAtPosition(position) as String == "yellow") {
                    color = "#e8f227"
                } else if (parent?.getItemAtPosition(position) as String == "black") {
                    color = "#30302d"
                } else if (parent?.getItemAtPosition(position) as String == "white") {
                    color = "#ebebeb"
                } else if (parent?.getItemAtPosition(position) as String == "orange") {
                    color = "#f7b023"
                }
            }
        }
    }

    fun dislike_a_video () {
        setTextField("url", "", "", "")
        activeField(field1 = true, field2 = false, field3 = false, field4 = false)
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, String>()
            params["url"] = window1?.contentView?.title?.text.toString()
            getService()
            createAppletValueRequest["reaction_service"] = service
            createAppletValueRequest["reaction_name"] = actionType
            createAppletValueRequest["reaction_params"] = params
            step = "action"
            pushRequest()
        }
    }

    fun unrate_a_video () {
        setTextField("url", "", "", "")
        activeField(field1 = true, field2 = false, field3 = false, field4 = false)
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, String>()
            params["url"] = window1?.contentView?.title?.text.toString()
            getService()
            createAppletValueRequest["reaction_service"] = service
            createAppletValueRequest["reaction_name"] = actionType
            createAppletValueRequest["reaction_params"] = params
            step = "action"
            pushRequest()
        }
    }

    fun area_send_mail () {
        setTextField("receiver", "object", "content", "")
        activeField(field1 = true, field2 = true, field3 = true, field4 = false)
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, String>()
            params["receiver"] = window1?.contentView?.title?.text.toString()
            params["object"] = window1?.contentView?.content?.text.toString()
            params["content"] = window1?.contentView?.field3?.text.toString()
            getService()
            createAppletValueRequest["reaction_service"] = service
            createAppletValueRequest["reaction_name"] = actionType
            createAppletValueRequest["reaction_params"] = params
            step = "action"
            pushRequest()
        }
    }

    fun activeField(field1: Boolean, field2: Boolean, field3: Boolean, field4: Boolean) {
        if (field1) {
            window1?.contentView?.titleBar?.isInvisible = false
            window1?.contentView?.title?.isInvisible = false
        }
        if (field2) {
            window1?.contentView?.content?.isInvisible = false
            window1?.contentView?.contentBar?.isInvisible = false
        }
        if (field3) {
            window1?.contentView?.field3?.isInvisible = false
            window1?.contentView?.contentBar2?.isInvisible = false
        }
        if (field4) {
            window1?.contentView?.field4?.isInvisible = false
            window1?.contentView?.contentBar4?.isInvisible = false
        }
    }

    fun setTextField(field1 : String, field2 : String, field3 : String, field4 : String) {
        window1?.contentView?.title?.setHint(field1)
        window1?.contentView?.content?.setHint(field2)
        window1?.contentView?.field3?.setHint(field3)
        window1?.contentView?.field4?.setHint(field4)
    }

    fun receive_a_mail() {
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, Any>()
            getService()
            createAppletValueRequest["action_service"] = service
            createAppletValueRequest["action_params"] = params
            createAppletValueRequest["action_name"] = actionType
            step = "reaction"
            startReaction()
        }
    }

    fun update_on_subbed_channel() {
        setTextField("chanel id", "", "", "")
        activeField(field1 = true, field2 = false, field3 = false, field4 = false)
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, Any>()
            params["channelId"] = window1?.contentView?.title?.text.toString()
            getService()
            createAppletValueRequest["action_service"] = service
            createAppletValueRequest["action_params"] = params
            createAppletValueRequest["action_name"] = actionType
            step = "reaction"
            startReaction()
        }
    }

    fun folder_uploaded() {
        setTextField("folder", "", "", "")
        window1?.contentView?.switch1?.isInvisible = false
        activeField(field1 = true, field2 = false, field3 = false, field4 = false)
        window1?.contentView?.textRiot?.text = "Recusive"
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, Any>()
            params["folder"] = window1?.contentView?.title?.text.toString()
            params["recursive"] = switch
            getService()
            createAppletValueRequest["action_service"] = service
            createAppletValueRequest["action_params"] = params
            createAppletValueRequest["action_name"] = actionType
            step = "reaction"
            startReaction()
        }
    }

    fun file_or_folder_deleted() {
        setTextField("folder", "", "", "")
        window1?.contentView?.switch1?.isInvisible = false
        activeField(field1 = true, field2 = false, field3 = false, field4 = false)
        window1?.contentView?.textRiot?.text = "Recusive"
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, Any>()
            params["folder"] = window1?.contentView?.title?.text.toString()
            params["recursive"] = switch
            getService()
            createAppletValueRequest["action_service"] = service
            createAppletValueRequest["action_params"] = params
            createAppletValueRequest["action_name"] = actionType
            step = "reaction"
            startReaction()
        }
    }

    fun new_game_with_requested_multi_kills() {
        setTextField("summoner", "", "", "")
        activeField(field1 = true, field2 = false, field3 = false, field4 = false)
        window1?.contentView?.number_picker?.minValue  = 1
        window1?.contentView?.number_picker?.isInvisible = false
        window1?.contentView?.textRiot?.text = "Nb kill"
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, Any>()
            params["multi_kill"] = pickerValue
            params["summoner_name"] = window1?.contentView?.title?.text.toString()
            getService()
            createAppletValueRequest["action_service"] = service
            createAppletValueRequest["action_params"] = params
            createAppletValueRequest["action_name"] = actionType
            step = "reaction"
            startReaction()
        }
    }

    fun send_mail () {
        setTextField("receiver", "object", "content", "")
        activeField(field1 = true, field2 = true, field3 = true, field4 = false)
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, String>()
            params["receiver"] = window1?.contentView?.title?.text.toString()
            params["object"] = window1?.contentView?.content?.text.toString()
            params["content"] = window1?.contentView?.field3?.text.toString()
            getService()
            createAppletValueRequest["reaction_service"] = service
            createAppletValueRequest["reaction_name"] = actionType
            createAppletValueRequest["reaction_params"] = params
            step = "action"
            pushRequest()
        }
    }

    fun comment_a_video () {
        setTextField("url", "comment", "", "")
        activeField(field1 = true, field2 = true, field3 = false, field4 = false)
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, String>()
            params["url"] = window1?.contentView?.title?.text.toString()
            params["comment"] = window1?.contentView?.content?.text.toString()
            getService()
            createAppletValueRequest["reaction_service"] = service
            createAppletValueRequest["reaction_name"] = actionType
            createAppletValueRequest["reaction_params"] = params
            step = "action"
            pushRequest()
        }
    }

    fun like_a_video () {
        setTextField("url", "", "", "")
        activeField(field1 = true, field2 = false, field3 = false, field4 = false)
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, String>()
            params["url"] = window1?.contentView?.title?.text.toString()
            getService()
            createAppletValueRequest["reaction_service"] = service
            createAppletValueRequest["reaction_name"] = actionType
            createAppletValueRequest["reaction_params"] = params
            step = "action"
            pushRequest()
        }
    }

    fun comment_on_issue () {
        setTextField("repo_owner", "repo_name", "issue_number", "comment")
        activeField(field1 = true, field2 = true, field3 = true, field4 = true)
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, String>()
            params["receiver"] = window1?.contentView?.title?.text.toString()
            params["object"] = window1?.contentView?.content?.text.toString()
            params["content"] = window1?.contentView?.field3?.text.toString()
            params["comment"] = window1?.contentView?.field4?.text.toString()
            getService()
            createAppletValueRequest["reaction_service"] = service
            createAppletValueRequest["reaction_name"] = actionType
            createAppletValueRequest["reaction_params"] = params
            step = "action"
            pushRequest()
        }
    }

    fun comment_on_pull_request () {
        setTextField("repo_owner", "repo_name", "issue_number", "comment")
        activeField(field1 = true, field2 = true, field3 = true, field4 = true)
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, String>()
            params["repo_owner"] = window1?.contentView?.title?.text.toString()
            params["repo_name"] = window1?.contentView?.content?.text.toString()
            params["pull_number"] = window1?.contentView?.field3?.text.toString()
            params["comment"] = window1?.contentView?.field4?.text.toString()
            getService()
            createAppletValueRequest["reaction_service"] = service
            createAppletValueRequest["reaction_name"] = actionType
            createAppletValueRequest["reaction_params"] = params
            step = "action"
            pushRequest()
        }
    }

    fun delete_file () {
        setTextField("repo_name", "file_name", "", "")
        activeField(field1 = true, field2 = true, field3 = false, field4 = false)
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, String>()
            params["repo_name"] = window1?.contentView?.title?.text.toString()
            params["file_name"] = window1?.contentView?.content?.text.toString()
            getService()
            createAppletValueRequest["reaction_service"] = service
            createAppletValueRequest["reaction_name"] = actionType
            createAppletValueRequest["reaction_params"] = params
            step = "action"
            pushRequest()
        }
    }

    fun duplicate_file () {
        setTextField("repo_name", "file_name", "", "")
        activeField(field1 = true, field2 = true, field3 = false, field4 = false)
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, String>()
            params["repo_name"] = window1?.contentView?.title?.text.toString()
            params["file_name"] = window1?.contentView?.content?.text.toString()
            getService()
            createAppletValueRequest["reaction_service"] = service
            createAppletValueRequest["reaction_name"] = actionType
            createAppletValueRequest["reaction_params"] = params
            step = "action"
            pushRequest()
        }
    }

    fun repository_modified () {
        setTextField("repo name", "", "", "")
        activeField(field1 = true, field2 = false, field3 = false, field4 = false)
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, String>()
            params["repo_name"] = window1?.contentView?.title?.text.toString()
            getService()
            createAppletValueRequest["action_service"] = service
            createAppletValueRequest["action_name"] = actionType
            createAppletValueRequest["action_params"] = params
            step = "reaction"
            startReaction()
        }
    }

    fun new_push_on_repo () {
        setTextField("repo_owner", "repo_name", "", "")
        activeField(field1 = true, field2 = true, field3 = true, field4 = false)
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, String>()
            params["repo_owner"] = window1?.contentView?.title?.text.toString()
            params["repo_name"] = window1?.contentView?.content?.text.toString()
            getService()
            createAppletValueRequest["action_service"] = service
            createAppletValueRequest["action_name"] = actionType
            createAppletValueRequest["action_params"] = params
            step = "reaction"
            startReaction()
        }
    }

    fun new_video_from_subscribed_channel () {
        setTextField("channel", "title", "url", "")
        activeField(field1 = true, field2 = true, field3 = false, field4 = false)
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, String>()
            params["channel"] = window1?.contentView?.title?.text.toString()
            params["title"] = window1?.contentView?.content?.text.toString()
            params["url"] = window1?.contentView?.field3?.text.toString()
            getService()
            createAppletValueRequest["action_service"] = service
            createAppletValueRequest["action_name"] = actionType
            createAppletValueRequest["action_params"] = params
            step = "reaction"
            startReaction()
        }
    }

    fun it_is_X_am () {
        window1?.contentView?.pickTimeBtn?.isInvisible = false
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, Int>()
            params["hour"] = hourPicker
            params["min"] = minPicker
            getService()
            createAppletValueRequest["action_service"] = service
            createAppletValueRequest["action_params"] = params
            createAppletValueRequest["action_name"] = actionType
            step = "reaction"
            startReaction()
        }
    }

    fun receive_a_mail_from_X() {
        setTextField("address", "", "", "")
        activeField(field1 = true, field2 = false, field3 = false, field4 = false)
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, String>()
            getService()
            createAppletValueRequest["action_service"] = service
            params["address"] = window1?.contentView?.title?.text.toString()
            createAppletValueRequest["action_params"] = params
            createAppletValueRequest["action_name"] = actionType
            step = "reaction"
            startReaction()
        }
    }

    fun getService() {
        for ((key, value) in saveJsonService) {
            if (actionType == key) {
                service = value
            }
        }
    }

    fun display() {
        val saveDays = arrayOf("blue", "green", "red", "yellow", "black", "white", "orange")
        val days: ArrayList<String> = ArrayList()
        for (s in saveDays) {
            days.add(s)
        }
        setSpinner(3, days)
        setTextField("title", "content", "", "")
        activeField(field1 = true, field2 = true, field3 = false, field4 = false)
        window1?.contentView?.spinner3?.isInvisible = false
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, String>()
            params["color"] = color
            params["title"] = window1?.contentView?.title?.text.toString()
            params["content"] = window1?.contentView?.content?.text.toString()
            getService()
            createAppletValueRequest["reaction_service"] = service
            createAppletValueRequest["reaction_name"] = actionType
            createAppletValueRequest["reaction_params"] = params
            step = "action"
            pushRequest()
        }
    }

    fun pushRequest () {
        clearDisplay()
        window1?.contentView?.button_next?.text = "Finish"
        window1?.contentView?.ActionOrReaction?.text = "Applet"
        window1?.contentView?.spinner1?.isInvisible = true
        setTextField("name", "", "description", "")
        activeField(field1 = true, field2 = false, field3 = true, field4 = false)
        window1?.contentView?.textView2?.text = "Set the title and the description of your applet."
        window1?.contentView?.button_next?.setOnClickListener {
            createAppletValueRequest["name"] = window1?.contentView?.title?.text.toString()
            createAppletValueRequest["description"] = window1?.contentView?.field3?.text.toString()
            val handleRequest = HandlerRequest(this)
            val url2 = "http://10.0.2.2:8080/applet"
            handleRequest.post(
                HandlerRequest.RequestType.ACCESS_TOKEN,
                url2,
                createAppletValueRequest,
                Response.Listener{ response ->
                    clearDisplay()
                    createAppletValueRequest.clear()
                    window1?.dismiss()
                },
                Response.ErrorListener { response ->
                    println("'${response}'")
                    Toast.makeText(this, "Error", Toast.LENGTH_LONG).show()}
            )
        }
    }

    fun one_day_per_week () {
        window1?.contentView?.spinner3?.isInvisible = false
        val saveDays = arrayOf("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday")
        val days: ArrayList<String> = ArrayList()
        for (s in saveDays) {
            days.add(s)
        }
        setSpinner(3, days)
        window1?.contentView?.pickTimeBtn?.isInvisible = false
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, Int>()
            params["hour"] = hourPicker
            params["min"] = minPicker
            getService()
            createAppletValueRequest["action_service"] = service
            createAppletValueRequest["action_params"] = params
            createAppletValueRequest["action_name"] = actionType
            step = "reaction"
            startReaction()
        }
    }

    fun every_X_hour () {
        window1?.contentView?.pickTimeBtn?.isInvisible = false
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, Int>()
            params["hour"] = hourPicker
            params["min"] = minPicker
            getService()
            createAppletValueRequest["action_service"] = service
            createAppletValueRequest["action_params"] = params
            createAppletValueRequest["action_name"] = actionType
            step = "reaction"
            startReaction()
        }
    }

    fun new_game_with_requested_kills () {
        setTextField("summoner", "", "", "")
        activeField(field1 = true, field2 = false, field3 = false, field4 = false)
        window1?.contentView?.number_picker?.minValue  = 0
        window1?.contentView?.number_picker?.isInvisible = false
        window1?.contentView?.textRiot?.text = "Nb kill"
        window1?.contentView?.button_next?.setOnClickListener {
            val params = HashMap<String, Any>()
            params["kills"] = pickerValue
            params["summoner_name"] = window1?.contentView?.title?.text.toString()
            getService()
            createAppletValueRequest["action_service"] = service
            createAppletValueRequest["action_params"] = params
            createAppletValueRequest["action_name"] = actionType
            step = "reaction"
            startReaction()
        }
    }

    fun startReaction() {
        window1?.contentView?.ActionOrReaction?.text = "Reaction"
        window1?.contentView?.button_next?.text = "Applet"
        clearDisplay()
        saveJsonDescription.clear()
        saveJsonParams.clear()
        saveJsonService.clear()
        val handleRequest = HandlerRequest(this)
        val url = "https://area51.ngrok.io/about/reactions"
        handleRequest.get(
            HandlerRequest.RequestType.ACCESS_TOKEN,
            url,
            Response.Listener{ response ->
                val answerArray = response.getJSONArray("reactions")
                for (i in 0 until answerArray.length()) {
                    val item = answerArray.getJSONObject(i)
                    addReactionName.add(item["name"].toString())
                    saveJsonDescription[item["name"].toString()] = item["description"].toString()
                    saveJsonParams[item["name"].toString()] = item["params"]
                    saveJsonService[item["name"].toString()] = item["service"].toString()
                }
                setSpinner(1, addReactionName)
            },
            Response.ErrorListener { response ->
                println("'${response}'")
                Toast.makeText(this, "Error", Toast.LENGTH_LONG).show()}
        )
    }

    fun setButton (window : PopupWindow) {
            if (!window.isShowing) {
                clearDisplay()
                window1?.contentView?.button_next?.text = "Reaction"
                add_action.setOnClickListener {
                    window.showAsDropDown(add_action)
                    val handleRequest = HandlerRequest(this)
                    val url = "https://area51.ngrok.io/about/actions"
                    handleRequest.get(
                        HandlerRequest.RequestType.ACCESS_TOKEN,
                        url,
                        Response.Listener{ response ->
                            val answerArray = response.getJSONArray("actions")
                            addAppletName.add("select action")
                            for (i in 0 until answerArray.length()) {
                                val item = answerArray.getJSONObject(i)
                                addAppletName.add(item["name"].toString())
                                saveJsonDescription[item["name"].toString()] = item["description"].toString()
                                saveJsonParams[item["name"].toString()] = item["params"]
                                saveJsonOutputs[item["name"].toString()] = item["outputs"]
                                saveJsonService[item["name"].toString()] = item["service"].toString()
                            }
                            setSpinner(1, addAppletName)
                        },
                        Response.ErrorListener { response ->
                            println("'${response}'")
                            Toast.makeText(this, "Error requesting actions", Toast.LENGTH_LONG).show()}
                    )
                    setButton(window)
                }
            } else {
                add_action.setOnClickListener {
                    clearDisplay()
                    createAppletValueRequest.clear()
                    step = "action"
                    addAppletName.clear()
                    window.dismiss()
                    window1?.contentView?.spinner1?.isInvisible = false
                    window1?.contentView?.ActionOrReaction?.text = "Action"
                    setButton(window)
                }
            }
    }

    fun clearDisplay() {
        window1?.contentView?.textView2?.text = ""
        window1?.contentView?.textRiot?.text = ""
        window1?.contentView?.pickTimeBtn?.isInvisible = true
        window1?.contentView?.number_picker?.isInvisible = true
        window1?.contentView?.spinner3?.isInvisible = true
        window1?.contentView?.titleBar?.isInvisible = true
        window1?.contentView?.contentBar?.isInvisible = true
        window1?.contentView?.title?.isInvisible = true
        window1?.contentView?.title?.setText("")
        window1?.contentView?.content?.setText("")
        window1?.contentView?.field3?.setText("")
        window1?.contentView?.field4?.setText("")
        window1?.contentView?.content?.isInvisible = true
        window1?.contentView?.field3?.isInvisible = true
        window1?.contentView?.contentBar2?.isInvisible = true
        window1?.contentView?.field4?.isInvisible = true
        window1?.contentView?.contentBar4?.isInvisible = true
        window1?.contentView?.switch1?.isInvisible = true
        window1?.contentView?.title?.setHint("")
        window1?.contentView?.content?.setHint("")
        window1?.contentView?.field3?.setHint("")
        window1?.contentView?.field4?.setHint("")
        window1?.contentView?.textViewTag?.text = ""
    }

    fun setSpinner(whitch : Int, tab : ArrayList<String>) {
        var arrayAdapter: ArrayAdapter<String>? = null
        if (whitch == 1) {
            arrayAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, tab)
            window1!!.contentView.spinner1.adapter = arrayAdapter
        } else if (whitch == 3) {
            arrayAdapter = ArrayAdapter(this, android.R.layout.simple_spinner_dropdown_item, tab)
            window1!!.contentView.spinner3.adapter = arrayAdapter
        }
    }

    fun addServices() {
        val handleRequest = HandlerRequest(this)
        val url = "https://area51.ngrok.io/applets"
        handleRequest.get(
            HandlerRequest.RequestType.ACCESS_TOKEN,
            url,
            Response.Listener{ response ->
                val answerArray = response.getJSONArray("applets")
                for (i in 0 until answerArray.length()) {
                    val item = answerArray.getJSONObject(i)
                    actionsName.add(item["name"].toString())
                    actionsDescription.add(item["description"].toString())
                    actionsLogo.add(item["action_s_name"].toString())
                    reactionsLogo.add(item["reaction_s_name"].toString())
                    actionsBackground.add(R.color.testYoutube)
                    actionsSwitch.add(item["enabled"].toString())
                    actionsId.add(item["id"].toString())
                }
                rv_action_list.layoutManager = LinearLayoutManager(this)
                rv_action_list.adapter = ActionAdapteur(actionsName, actionsLogo, reactionsLogo, actionsBackground, actionsSwitch, actionsDescription, actionsId, this)
            },
            Response.ErrorListener { response ->
                println("'${response}'")
                Toast.makeText(this, "Error getting back your applet", Toast.LENGTH_LONG).show()}
        )
    }
}