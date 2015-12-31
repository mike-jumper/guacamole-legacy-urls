guacamole-legacy-urls
=====================

This Guacamole extension adds support for the old human-readable connection
URL format used in Guacamole 0.9.7 and older. Requests for
`/client/TYPE/IDENTIFIER` are automatically redirected to the corresponding and
proper `/client/[DATA]` URL.

Caveats
-------

It is important to note that the new non-human-readable URL format was adopted
within Guacamole 0.9.8 to facilitate support for simultaneous loading of
multiple extensions. The legacy URL format used by 0.9.7 and older does not
include the same level of information as the 0.9.8+ format, and is ambiguous
with respect to multiple extensions.

If you use multiple authentication backends, legacy URLs will only address the
backend which actually authenticated the current user. Connections and
connection groups stored within other backends will only be accessible with the
unambiguous 0.9.8+ format.

