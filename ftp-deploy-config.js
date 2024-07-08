import FtpDeploy from "ftp-deploy";
import * as nodePath from 'path';


const ftpDeploy = new FtpDeploy();
const rootFolder = nodePath.resolve();

const config = {
  user: "ksm@inthehood",
  password: "H1mdui2dPqksm",
  host: "141.8.193.210",
  port: 21,
  localRoot: rootFolder + "/KSM",
  remoteRoot: "/",
  include: ["*", "**/*"], // This uploads all files
  deleteRemote: false, // Set this to true if you want to delete existing files
  forcePasv: true // Optional for some servers
};

ftpDeploy.deploy(config, function (err) {
  if (err) console.log(err);
  else console.log("finished");
});

ftpDeploy.on('uploading', function (data) {
  console.log(`Загружается файл: ${data.filename} (${data.transferredFileCount}/${data.totalFilesCount})`);
});

ftpDeploy.on('uploaded', function (data) {
  console.log(`Загружен файл: ${data.filename}`);
});