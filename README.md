<h1>InventoryAI</h1>

InventoryAi is an automated couting machine which counts all thoses products maintained or stored on Warehouses. Here it helps you in reducing the work load and consumes time.
Beyond an Ai Machine, it helps in may other ways:
<ul>
<li>Generate Total Count of Product</li>
<li>Get Present Maintained Stock</li>
<li>Identify the overall analytics of Products and sales</li>
</ul>
and lots more.

<h2>How to Integrate</h2>

InventoryAi is build with 2 powerfull frameworks where Angular takes care of the Ui and Django on backend delivers a significant support to provide the best result by rendering the Ai Engine on back.

<h3>Angular</h3>

Install Node Js from the offcial [Node Js page.](https://nodejs.org/en/download/)

Once Node is installed onto your system next in to clone this <code>[repo](https://github.com/haiiamnikhil/Django-Angular-Object-Counter)</code>

After cloning, navigate to <code>Django-Angular-Object-Counter\\Object-Detection-frontend\\</code>folder and install node packaged using the following command below

<h3><code>npm install</code></h3>

After installing the node packages navigate back to the home directory <code>Django-Angular-Object-Counter\\</code>

<h3>Django</h3>

Now create a **Pip Virtual Environment** using the following Command

<code>virtualenv env</code> (evn used here is just a name of environment, you are free to use any name as per your need)

After installing environment activate environment uisng <code>cd env\\</code> press enter,then <code>Script\\activate\\</code>

Now your environemnt is activated. Next navigate back to home directory as said before.

Once navigated back, install **requirements.txt** using

<h3><code>pip install -r requirements.txt</code></h3>

Wait for the installation to be completed

After installing, now you are free to run the project

<h3>Running Project</h3>

Brefore starting the server, delete the <code>sqllite</code> file present on the home directory.

After that run

<ul>
<li>
  <code>py manage.py makemigrations app</code>
 </li>
  <li>
    <code>py manage.py migrate</code>
  </li>
  <li>
    <code>py manage.py createsuperuser</code> create super user as your choice
  </li>
</ul>

<h3><code>py manage.py runserver</code></h3>

<h2>Point to be remembered</h2>

As per today (March 2021) this project is under development.
