# AREA
AREA is a web platform that lets you link up different services to each other thanks to Actions and REActions.<br>
On this platform, the combination of an Action and a REAction is referred to as an Applet.<br>
You could, for example, create an Applet that links a service like Github to a service like Outlook.<br>
The Action would be something like a new push on a given Github repository and this Action would trigger the REAction. <br>
In this case scenario, the REAction could be something like sending a mail containing informations about the commit.
    
## Environment variables
In order to make the project work, you have to populate the .env file at the root of the repository. <br>
This file contains a number of empty environment variables describing sensitives values such as API keys, client ids and secrets.<br>
In this section, we will explain how to get every one of them.

#### `POSTGRES_USER`
The name of the UNIX user accessing the database. 
<br><br>
#### `POSTGRES_PASSWORD` 
The password used to access the database.
<br><br>
#### `POSTGRES_DB` 
The name of the database.
<br><br>
#### `POSTGRES_PORT` 
The port of the database.
<br><br>
#### `POSTGRES_HOST` 
The host address of the database.
<br><br>
#### `API_PORT` 
The port on which the api listens to.
<br><br>
#### `NGROK_SUBOMAIN` 
The subdomain that ngrok will expose for the api.
<br><br>
#### `BCRYPT_SALT_ROUNDS` 
The number of rounds used by bcrypt to hash passwords (10 max recommended).
<br><br>
#### `OUTLOOK_CLIENT_ID`
To get your Outlook client ID, please refer to [Microsoft Azure's documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).<br>
Make sure to provide suffisent API permissions to your application (openid, profile, email, offline_access, Mail.Read, Mail.Send, User.Read).
<br><br> 
#### `OUTLOOK_CLIENT_SECRET`
To get your Outlook client secret, please refer to [Microsoft Azure's documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app).<br>
Make sure to provide suffisent API permissions to your application (openid, profile, email, offline_access, Mail.Read, Mail.Send, User.Read).
<br><br> 
#### `RIOT_API_KEY`
To get your Riot API key, please refer to [Riot's documentation](https://developer.riotgames.com/docs/portal).
<br><br> 
#### `GOOGLE_CLIENT_ID`
To get your Google client ID, please head over to [Google's Developer Console](https://console.developers.google.com/).<br>
Create a project and setup your credentials.
<br><br> 
#### `GOOGLE_CLIENT_SECRET`
To get your Google client secret, please head over to [Google's Developer Console](https://console.developers.google.com/).<br>
Create a project and setup your credentials.
<br><br> 
#### `GITHUB_CLIENT_ID`
To get your Github client ID, please refer to [Github's documentation](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/).
<br><br> 
#### `GITHUB_CLIENT_SECRET`
To get your Github client secret, please refer to [Github's documentation](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/).
<br><br> 
#### `DROPBOX_CLIENT_ID`
To get your Dropbox client ID, please refer to [Dropbox's documentation](https://www.dropbox.com/developers/reference/getting-started#app%20console).<br>
The client ID is refered to as an 'App key' on Dropbox's platform.
<br><br> 
#### `DROPBOX_CLIENT_SECRET`
To get your Dropbox client secret, please refer to [Dropbox's documentation](https://www.dropbox.com/developers/reference/getting-started#app%20console).<br>
The client ID is refered to as an 'App secret' on Dropbox's platform.
<br><br> 

## Front web
The webpage is located on localhost:8081, it will redirect you on the login page. If you don't have 
an account, you can click on the register button to go on the register page to create an account. Once you did that, you can connect on the area with your
email or username and your password. The client will then redirect you on the area page.

The area page contains 3 clickables headers buttons. Wall, service and applet. By default, wall is selected.

#### Wall

The wall is the page where all the triggered actions that have a *displaying* reaction will be displayed.
You will have each reaction printed inside boxes, with the title of the reaction, and the content, choosed by the user when creation an applet on Applet page.
You can remove a displayed reaction by clicking on the *trash button*. It will remove the displayed reaction.
#### Applet

The applet page is where all your created applet are displayed, and where you can create an applet.
If you have created an applet, you will see the action your applet use, and the reaction related to this applet. You will also see the status of this applet, enabled of disabled.
<br><br>
You can create an applet by clicking on the *+* blue button, it will open a pop-up where you can choose a title and description for your applet, then by clicking on *continue*, you can choose an action and
modify the parameters. Then, by clicking on *continue*, you can choose a reaction, modify the parameters and print the action-related variables.

#### Service

The service page is where all the availables services are displayed. You can click on *link account* to link your account to the area if the service needs your authorization. For example, to link your youtube account to the area, just click on the *link account* button and then authorize the area to access to your account.
Once you are connected, you will see a *connected* button, wich tells you that you have linked your account on the area. If you are connected, you can disconnect you by clicking on the *trash button*. If the service doesn't need OAuth, no *link button* will be displayed.

## Mobile application
You can get the apk file through two ways : 
either you launch docker-compose and get it directly in your folder apk or you download it from the web client going on this route : /client.apk 
The area app allows you to sign in to your account or create one then you can access the app composed with 3 main buttons (default = wall, applets then services)

#### Wall

The wall is the page where all the triggered actions who has a *displaying*" reaction will be displayed.
You will have each reaction printed in box, with the title of the reaction, and the content, choosed by the user when creation an applet on Applet page.
You can remove a displayed reaction by clicking on the *trash button*. It will remove the displayed reaction.

#### Applet

The applet page is where all your created applet are displayed, and where tou can create an applet.
If you have created an applet, you will see the action your applet use, and the reaction related to this applet. You will also see the status of this applet, enabled of disabled.
<br><br>
You can create an applet by clicking on the *+* blue button, it will open a pop-up where you can choose a title and description for your applet, then by clicking on *continue*, you can choose an action and
modify the parameters. Then, by clicking on *continue*, you can choose a reaction, modify the parameters and print the action-related variables.

#### Service

The service page is where all the availables services are displayed. You can click on *add account* to link your account to the area if the service need OAuth. For example, to link your youtube account to the area, just click on the *add account* button and then authorize the area to access to your account.
Once you are connected, you will see a *connected* button, wich tells you that you have linked your account on the area. If you are connected, you can disconnect you by clicking on the *cross button*. If the service doesn't need OAuth, no *add account* will be displayed.
