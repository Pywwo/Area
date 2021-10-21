package com.epitech.myapplication

import android.content.Context
import android.graphics.Color
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.android.volley.Response
import kotlinx.android.synthetic.main.activity_service.*
import kotlinx.android.synthetic.main.login_page.*
import kotlinx.android.synthetic.main.wall_list_item.view.*

class WallAdapter(val items : ArrayList<String>, val colors : ArrayList<String>, val content : ArrayList<String>, val id : ArrayList<String>, val context: Context) : RecyclerView.Adapter<ViewHolderWall>() {

    /*!
     * @brief function to get the numbre of item in adapter
     */
    override fun getItemCount(): Int {
        return items.size
    }

    /*!
     * @brief function called when the holde of the view is created
     */
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolderWall {
        return ViewHolderWall(LayoutInflater.from(context).inflate(R.layout.wall_list_item, parent, false))
    }

    /*!
     * @brief function called when they bind each item to the view holder
     */
    override fun onBindViewHolder(holder: ViewHolderWall, position: Int) {
        holder?.tvTitle.text = items.get(position)
        try {
            holder?.ivBackground?.setBackgroundColor(Color.parseColor(colors.get(position)))
        } catch (iae: IllegalArgumentException) {
            holder?.ivBackground?.setBackgroundColor(Color.parseColor("#314DE1"))
        }
        holder?.tvContent?.text = content.get(position)
        holder?.btnCancell?.setOnClickListener {
            val handleRequest = HandlerRequest(context)
            val url = "https://area51.ngrok.io/display?display_id=" + id.get(position)
            handleRequest.del(
                HandlerRequest.RequestType.ACCESS_TOKEN,
                url,
                Response.Listener{ response ->
                    notifyItemRemoved(position)
                    id.remove(id[position])
                    items.remove(items[position])
                    colors.remove(colors[position])
                    content.remove(content[position])
                    notifyDataSetChanged()
                },
                Response.ErrorListener { response ->
                    println("'${response}'")
                    Toast.makeText(context, "Error removing your display", Toast.LENGTH_LONG).show()
                }
            )
        }
    }
}

class ViewHolderWall (view: View) : RecyclerView.ViewHolder(view) {
    val tvTitle = view.tv_title
    val ivBackground = view.iv_background
    val tvContent = view.tv_content
    val btnCancell = view.btn_cancel
}