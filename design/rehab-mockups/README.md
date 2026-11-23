Source for the Incident Management Portal mockups in public/images/projects/rehab/.
Illustrative only: generic branding and invented data, no client screens.

Re-render (2000x1000) after editing, then convert to JPEG:
  CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  "$CH" --headless=new --hide-scrollbars --window-size=1000,500 --force-device-scale-factor=2 --screenshot=cover.png "file://$PWD/cover.html"
  sips -s format jpeg -s formatOptions 85 cover.png --out ../../public/images/projects/rehab/cover.jpg
