var viewerElement = document.getElementById('viewer');


WebViewer({
  path: '/public/lib',
  // preloadWorker: WebViewer.WorkerTypes.ALL,
  enableOfficeEditing: true,
  type: 'html5',  
  language: 'zh_cn',
  // 加载中文字体
}, viewerElement).then(instance => {

  const chooseFIle = document.getElementById('chooseFIle');

  chooseFIle.addEventListener('change', function(e) {
    const file = e.target.files[0];
    instance.UI.loadDocument(file, { filename: file.name });
  });
});



// WPA app installer
const Installer = function(root) {
  let promptEvent;

  const install = function(e) {
    if(promptEvent) {
      promptEvent.prompt();
      promptEvent.userChoice
        .then(function(choiceResult) {
          // The user actioned the prompt (good or bad).
          // good is handled in
          promptEvent = null;
          root.classList.remove('available');
        })
        .catch(function(installError) {
          // Boo. update the UI.
          promptEvent = null;
          root.classList.remove('available');
        });
    }
  };

  const installed = function(e) {
    promptEvent = null;
    // This fires after onbeforinstallprompt OR after manual add to homescreen.
    root.classList.remove('available');
  };

  const beforeinstallprompt = function(e) {
    promptEvent = e;
    promptEvent.preventDefault();
    root.classList.add('available');
    return false;
  };

  window.addEventListener('beforeinstallprompt', beforeinstallprompt);
  window.addEventListener('appinstalled', installed);

  root.addEventListener('click', install.bind(this));
  root.addEventListener('touchend', install.bind(this));
};


window.addEventListener('load', function() {
  const installEl = document.getElementById('installer');
  const installer = new Installer(installEl);

  var headerElement = document.getElementsByTagName('header')[0];
  var asideElement = document.getElementsByTagName('aside')[0];

  var menuButton = document.createElement('div');
  menuButton.className = 'menu';
  menuButton.onclick = function() {
    if (asideElement.style.display === 'block') {
      asideElement.style.display = 'none';
    } else {
      asideElement.style.display = 'block';
    }
  };


  var div = document.createElement('div');
  menuButton.appendChild(div);
  menuButton.appendChild(div.cloneNode());
  menuButton.appendChild(div.cloneNode());

  headerElement.appendChild(menuButton);
})
