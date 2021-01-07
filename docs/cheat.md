<!--
# @title Cheat sheet
-->

# Cheat sheet

## Controls

You can configure most of your admin page's behavior by editing Controls.
They only work with ActiveRecord models

Controls have several required and optional methods. Note that all arguments
must be defined, even if they are ignored.


### Required methods

The following are the methods that must be defined in the `Controls` class.

* **`#model()`**
  The model that your controller is working with


### Optional methods

The following are the methods that can be defined in the `Controls` class.

* **`#title()`**
  The title to show on the main panel
* **`#collection_actions(action:)`**
  The list of collection-level links
* **`#member_actions(action:)`**
  The list of member-level links and `#show` pages
* **`#scope(action:)`**
  The starting point of the query/relation. Defaults to `#all`
* **`#display_schema(action:)`**
  The display schema definition for the `#index` and `#show` pages
* **`#form_schema(action:)`**
  The form schema definition for the `#new` and `#edit` pages
* **`#permitted_params(params, action:)`**
  The strong parameters definition
