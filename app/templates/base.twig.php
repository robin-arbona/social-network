<!DOCTYPE html>
<html>

<head>
    {% block head %}
    <link rel="stylesheet" href="{{path}}/css/style.css" />
    <title>{% block title %}{% endblock %} - My Webpage</title>
    {% endblock %}
</head>

<body>
    <div id="content">{% block content %}
        <p>caca</p>
        {% endblock %}
    </div>
    <div id="footer">
        {% block footer %}
        &copy; Copyright 2011 by <a href="http://domain.invalid/">you</a>.
        {% endblock %}
    </div>
</body>

</html>