guacamole-legacy-urls
=====================

This Guacamole extension adds support for the old human-readable connection
URL format used in Guacamole 0.9.7 and older. Requests for
`/client/TYPE/IDENTIFIER` are automatically redirected to the corresponding and
proper `/client/[DATA]` URL.


Installation
------------

1. Clone the "guacamole-legacy-urls" repository using git:

   ```console
   $ git clone https://github.com/mike-jumper/guacamole-legacy-urls.git
   Cloning into 'guacamole-legacy-urls'...
   remote: Counting objects: 28, done.
   remote: Compressing objects: 100% (14/14), done.
   remote: Total 28 (delta 8), reused 27 (delta 7), pack-reused 0
   Unpacking objects: 100% (28/28), done.
   Checking connectivity... done.
   $ 
   ```

2. Build the extension itself using Maven:

   ```console
   $ cd guacamole-legacy-urls/
   $ mvn package
   [INFO] Scanning for projects...
   [INFO]                                                                         
   [INFO] ------------------------------------------------------------------------
   [INFO] Building guacamole-legacy-urls 0.9.9
   [INFO] ------------------------------------------------------------------------
   [INFO] 
   ...
   [INFO] Building jar: guacamole-legacy-urls/target/guacamole-legacy-urls-0.9.9.jar
   [INFO] ------------------------------------------------------------------------
   [INFO] BUILD SUCCESS
   [INFO] ------------------------------------------------------------------------
   [INFO] Total time: 0.968 s
   [INFO] Finished at: 2015-12-31T03:18:23-08:00
   [INFO] Final Memory: 11M/106M
   [INFO] ------------------------------------------------------------------------
   $
   ```
3. Copy the resulting `target/guacamole-legacy-urls-0.9.9.jar` file to
   `GUACAMOLE_HOME/extensions`. If unsure what `GUACAMOLE_HOME/extensions`
   refers to, please consult [the documentation covering `GUACAMOLE_HOME` in
   the Guacamole manual](http://guac-dev.org/doc/gug/configuring-guacamole.html#guacamole-home).

4. Restart Tomcat (or whichever servlet container you are using) to restart
   Guacamole and load the new extension. **You may also need to clear browser
   cache for the changes to take effect.**

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

