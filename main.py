from bottle import route,run

def get_file(filename):
  with open(f"./client/{filename}","r") as file:
    return file.read()

@route("/")
def homepage():
  return page("index.html")

@route("/<path:path>")
def page(path):
  return get_file(path)

run(host="0.0.0.0",port=8080,debug=True)