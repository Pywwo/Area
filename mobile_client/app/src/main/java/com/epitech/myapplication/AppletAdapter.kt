package com.epitech.myapplication

import android.content.Context
import android.content.res.Resources
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Response
import kotlinx.android.synthetic.main.applets_list_item.view.*

class ActionAdapteur(val items : ArrayList<String>, val aclogos : ArrayList<String>, val reaclogos : ArrayList<String>, val backgrounds : ArrayList<Int>, val switch : ArrayList<String>, val actionsDescription: ArrayList<String>, val actionsId: ArrayList<String>, val context: Context) : RecyclerView.Adapter<ViewHolderApplets>() {

    /*!
    * @brief function to get the numbre of item in adapter
    */
    override fun getItemCount(): Int {
        return items.size
    }

    /*!
     * @brief function called when the holde of the view is created
     */
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolderApplets {
        return ViewHolderApplets(LayoutInflater.from(context).inflate(R.layout.applets_list_item, parent, false))
    }

    /*!
     * @brief function called when they bind each item to the view holder
     */
    override fun onBindViewHolder(holder: ViewHolderApplets, position: Int) {
        holder?.ivAppletBackground?.setBackgroundResource(backgrounds.get(position))
        holder?.tvAppletType?.text = items.get(position)
        holder?.tvAppletDescription?.text = actionsDescription.get(position)
        holder?.iv_switch?.isChecked = switch.get(position) == "true"
        holder?.iv_switch?.setOnCheckedChangeListener { _, isChecked ->
            enableService(actionsId.get(position))
        }
        val id = context.getResources().getIdentifier(aclogos.get(position), "drawable", context.getPackageName())
        val id2 = context.getResources().getIdentifier(reaclogos.get(position), "drawable", context.getPackageName())
        if (id !== Resources.ID_NULL) {
            val drawable = context.getResources().getDrawable(id)
            holder?.ivAppletLogo?.setImageDrawable(drawable)
        }
        if (id2 !== Resources.ID_NULL) {
            val drawable2 = context.getResources().getDrawable(id2)
            holder?.ivAppletLogo2?.setImageDrawable(drawable2)
        }
        holder?.btn_cancel?.setOnClickListener {
            val handleRequest = HandlerRequest(context)
            val url = "https://area51.ngrok.io/applet?applet_id=" + actionsId.get(position)
            handleRequest.del(
                HandlerRequest.RequestType.ACCESS_TOKEN,
                url,
                Response.Listener{ response ->
                    notifyItemRemoved(position)
                    items.remove(items[position])
                    aclogos.remove(aclogos[position])
                    reaclogos.remove(aclogos[position])
                    backgrounds.remove(backgrounds[position])
                    switch.remove(switch[position])
                    actionsDescription.remove(actionsDescription[position])
                    actionsId.remove(actionsId[position])
                    notifyDataSetChanged()
                },
                Response.ErrorListener { response ->
                    println("'${response}'")
                    Toast.makeText(context, "Error removing your applet", Toast.LENGTH_LONG).show()
                }
            )
        }
    }

    fun enableService(Id : String) {
        val handleRequest = HandlerRequest(context)
        val url = "https://area51.ngrok.io/applet/enable"
        val map = HashMap<String, String>()
        map["applet_id"] = Id
        handleRequest.put(
            HandlerRequest.RequestType.ACCESS_TOKEN,
            url,
            map,
            Response.Listener{},
            Response.ErrorListener { response ->
                println("'${response}'")
                Toast.makeText(context, "Error enabling your applet", Toast.LENGTH_LONG).show()
           }
        )
    }
}

class ViewHolderApplets (view: View) : RecyclerView.ViewHolder(view) {
    val tvAppletType = view.tv_applet_type
    val tvAppletDescription = view.tv_applet_description
    val ivAppletLogo = view.iv_applet_logo
    val ivAppletLogo2 = view.iv_applet_logo2
    val ivAppletBackground = view.applet_background
    val iv_switch = view.switch1
    val btn_cancel = view.btn_cancel_applet
}