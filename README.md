# X:/Controller

⚠️ This project is being superseded by [XRC](https://github.com/Xtrendence/XRC). ⚠️

X:/Controller is a simple and (relatively) safe remote access tool with limited functionality (for security reasons). It currently only works on Windows. It's intended to be used as a service (more on this below) so it can run in the background. When it's running, you can access the web interface on any device on the same network, and restart, or shutdown the device that's running it. You can also use it as a barebones task manager that can end processes.

In case you're curious about its intended use case, I sometimes stay up late and I tend to be too tired to get up and turn off my PC, so with this running in the background, I can use my phone to turn it off. It's also useful if your computer freezes, and you can't even access the task manager. With X:/Controller, you can end processes without having to use your computer.

#### Please note that this is meant to be used on a private network. Its only security feature is a passcode that's in plaintext at the top of the code in the "server.js" file. As such, it'd be easy for someone else on the network to potentially gain access to it. All they can really do is shut down your device, restart it, or end processes, so your files and whatnot should be safe.

### How do I use it?

First of all, make sure you have Node installed. Download and extract this repo's files. Open "server.js" with a text editor, and modify the variables at the very top. The default passcode is "0000". The passcode is checked against a string, so make sure you put whatever numbers you choose inside quotation marks. Script path should automatically point towards wherever "server.js" is on your device, but if it doesn't for some reason, replace it with an absolute path. The port number is simply what port Node will listen to for GET and POST requests. If the default port (1738) is taken by another application, you can change it to another number (this must be an integer in terms of the data type, so make sure there are no quotation marks around it).

After modifying the changeable variables, use Git Bash, CMD, or however you prefer to run Node, change the directory (CD) to the one where "server.js" is, and run "npm install" to install all the node modules required for this program to work. Then, run "node server.js" to start it. Using a browser, go to 127.0.0.1:1738 (if you're using another device instead of the host, then 127.0.0.1 will have to be replaced with the host's IP address, and if you've changed the port number, you'll have to replace 1738 with that number). Enter your passcode, click on the settings icon, and click on "Install Service" and click on "Yes" to any popup UAC prompts. You can check your OS' services list to make sure "X-Controller" has been installed. You can now close Git Bash or CMD and use your PC as you normally would. You can access the web interface on any device that's on the same network by simply navigating to the IP address of the host device using the port number that you set in "server.js", where you'll be able to shutdown or restart the host, or end individual processes.

If the service doesn't get installed properly, you can also use [NSSM](https://nssm.cc/) to run it as a service.

![X:/Controller](https://i.imgur.com/BCgLDHj.png)
