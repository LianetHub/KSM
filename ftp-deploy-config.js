const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const config = {
  user: "ksm@inthehood",
  password: "H1mdui2dPqksm",
  host: "141.8.193.210",
  port: 21,
  localRoot: __dirname + "/KSM",
  remoteRoot: "/path/to/remote/directory",
  include: ["*", "**/*"], // This uploads all files
  deleteRemote: false, // Set this to true if you want to delete existing files
  forcePasv: true // Optional for some servers
};

ftpDeploy.deploy(config, function (err) {
  if (err) console.log(err);
  else console.log("finished");
});