from bottle import route,run,static_file

def get_file(filename):
  try:
    return static_file("./client/"+filename,"./")
  except Exception as e:
    return str(e)

@route("/")
def homepage():
  return page("index.html")

@route("/<path:path>")
def page(path):
  return get_file(path)

run(host="0.0.0.0",port=8080,debug=True)