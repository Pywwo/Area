package com.epitech.myapplication

import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.res.Resources.ID_NULL
import android.graphics.Color
import android.net.Uri
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.core.content.ContextCompat.startActivity
import androidx.recyclerview.widget.RecyclerView
import kotlinx.android.synthetic.main.services_list_item.view.*

class ServicesAdapter(val items : ArrayList<String>, val logos : ArrayList<String>, val backgrounds : ArrayList<String>, val oauth : ArrayList<String>, val context: Context) : RecyclerView.Adapter<ViewHolder>() {

    override fun getItemCount(): Int {
        return items.size
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        return ViewHolder(LayoutInflater.from(context).inflate(R.layout.services_list_item, parent, false))
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder?.ivServiceBackground?.setBackgroundColor(Color.parseColor(backgrounds.get(position)))
        holder?.tvServiceType?.text = items.get(position)
        val id = context.getResources().getIdentifier(logos.get(position), "drawable", context.getPackageName())
        if (id !== ID_NULL) {
            val drawable = context.getResources().getDrawable(id)
            holder?.ivServiceLogo?.setImageDrawable(drawable)
        }
        if (oauth.get(position) !== "none")
            holder?.buttonServiceOauth?.text = "Add account"
        else
            holder?.buttonServiceOauth?.text = ""
        holder?.buttonServiceOauth?.setOnClickListener {
            if (holder?.buttonServiceOauth?.text !== "") {
                val url = "https://area51.ngrok.io" + oauth[position] + "?service=" + items.get(position) + "&accessToken=" + context.getSharedPreferences("AccessToken", Context.MODE_PRIVATE).getString("AccessToken", null)
                val intent = Intent(Intent.ACTION_VIEW)
                intent.data = Uri.parse(url)
                context.startActivity(intent)
                (context as ServiceActivity).finish()
            }
        }
    }
}

class ViewHolder (view: View) : RecyclerView.ViewHolder(view) {
    val tvServiceType = view.tv_service_type
    val ivServiceLogo = view.iv_service_logo
    val ivServiceBackground = view.iv_background
    val buttonServiceOauth = view.button_oauth
}