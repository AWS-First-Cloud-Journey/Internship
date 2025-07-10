# Elastic Beanstalk entry point
from app import app

if __name__ == "__main__":
    app.run(debug=False)