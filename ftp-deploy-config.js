const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const config = {
  user: "your-ftp-username",
  password: "your-ftp-password",
  host: "your-ftp-host",
  port: 21,
  localRoot: __dirname + "/build",
  remoteRoot: "/path/to/remote/directory",
  include: ["*", "**/*"], // This uploads all files
  deleteRemote: false, // Set this to true if you want to delete existing files
  forcePasv: true // Optional for some servers
};

ftpDeploy.deploy(config, function(err) {
  if (err) console.log(err);
  else console.log("finished");
});