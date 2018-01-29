import React from 'react';

const About = () => (
  <div>
    <h1 id="rest-explorer-for-the-densho-project-s-rest-api">
      REST explorer for the Densho Project&#39;s REST API
    </h1>
    <p>
      Source code available at:{' '}
      <a href="https://github.com/brianyamasaki/rest-explorer">
        https://github.com/brianyamasaki/rest-explorer
      </a>{' '}
    </p>
    <h2 id="installation">Installation</h2>
    <p>
      Creating this project requires <a href="http://www.nodesjs.org">Node</a>,
      followed by <a href="http://www.yarnpkg.com">Yarn</a>. Node is best
      supported on Linux and MacOS, though by installing long file names (paths
      &gt; 256 chars) it should build on Windows.
    </p>
    <pre>
      <code class="lang-bash">
        git <span class="hljs-keyword">clone</span>{' '}
        <span class="hljs-title">https</span>://github.com/brianyamasaki/rest-explorer.git
        cd rest-explorer yarn
      </code>
    </pre>
    <h2 id="get-started">Get started</h2>
    <p>Starting the Development server is done by the following</p>
    <pre>
      <code class="lang-bash">
        yarn <span class="hljs-literal">start</span>
      </code>
    </pre>
    <p>Creating an optimized release version is done by the following</p>
    <pre>
      <code class="lang-bash">
        <span class="hljs-attribute">yarn build</span>
      </code>
    </pre>
    <p>
      This project is built using{' '}
      <a href="https://github.com/facebookincubator/create-react-app">
        create-react-app
      </a>{' '}
      so you will want to read that User Guide for more goodies.
    </p>
  </div>
);

export default About;
