# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = 'note'
copyright = '2025, tuoxie'
author = 'tuoxie'
release = 'V0.0.9'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = [
#  'recommonmark',
 'sphinx_markdown_tables',
 'myst_parser',
 'sphinxcontrib.mermaid',
 'sphinx_copybutton'
]

# 启用myst的额外功能
myst_enable_extensions = [
    "colon_fence",  # 替换 "mermaid" 为 "colon_fence"
    "dollarmath",   # 支持 LaTeX 数学公式
    "tasklist",     # 支持任务列表
    "deflist"       # 支持定义列表
]

# 配置 myst-parser 识别 ```mermaid 代码块
myst_fence_as_directive = ["mermaid"]
# Mermaid 配置
mermaid_params = ['--theme', 'default']


templates_path = ['_templates']
exclude_patterns = []



# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

#html_theme = 'alabaster'
html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']
