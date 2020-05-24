<!--
# @title Controls
-->

# Controls

Controls are the primary way to "control" the behavior of your admin pages.

Controls have several required and optional methods.

<dl>
  <dt><code>#model</code> (required)</dt>
  <dd>The model</dd>

  <dt><code>#permitted_params</code> (required)</dt>
  <dd>The strong parameters definition</dd>

  <dt><code>#display_schema</code> (required)</dt>
  <dd>The display definition for the <code>#index</code> and <code>#show</code> pages</dd>

  <dt><code>#form_schema</code> (required)</dt>
  <dd>The form definition for the <code>#new</code> and <code>#edit</code> pages</dd>

  <dt><code>#title</code> (optional)</dt>
  <dd>The title to show on the main panel</dd>

  <dt><code>#resources_actions</code> (optional)</dt>
  <dd>The list of collection-level links</dd>

  <dt><code>#resource_actions</code> (optional)</dt>
  <dd>The list of member-level links</dd>

  <dt><code>#scope</code> (optional)</dt>
  <dd>The starting point of the query/relation. Defaults to <code>#all</code></dd>
</dl>


For more information, it may be helpful to look at the implementation of
`Super::Controls`.
