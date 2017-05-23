/**
 * @desc Helper to check if server settings are available
 * @param alert {boolean}  TRUE=prompts a Browser message box, FALSE=returns boolean
 * @return {boolean}
 */
function hasSettings(alert) {
  var available = getCfg('available');
  var domain = getCfg('jira_domain');
  var username = getCfg('jira_username');
  var password = getCfg('jira_password');

  var userProps = PropertiesService.getUserProperties();
  if( userProps.getProperty('jiraColumnDefault') != null ) {
    jiraColumnDefault = JSON.parse(userProps.getProperty('jiraColumnDefault'));
  }
  userProps.setProperty('jiraColumnDefault', JSON.stringify(jiraColumnDefault));

  if(available === undefined || !username || !password || !domain) {
    if(alert) Browser.msgBox("Jira Error", 
                   "Please configure the Jira Settings first!\\n\\n" +
                   '"Jira -> Settings"', Browser.Buttons.OK);
    return false;
  }

  return true;
}

/**
 * @desc Short Helper to set a server config property into users storage
 * @param key {string}
 * @param value {string}
 * @return {this}  Allow chaining
 */
function setCfg(key, value) {
  var userProps = PropertiesService.getUserProperties();
  userProps.setProperty('serverConfig.' + key, value);
  return this;
}

/**
 * @desc Short Helper to get a server config property from users storage
 * @param key {string}
 * @return {string}||NULL
 */
function getCfg(key) {
  var userProps = PropertiesService.getUserProperties();
  return userProps.getProperty('serverConfig.' + key);
}

// default issue fields/columns for issue listings
var jiraColumnDefault = [
  'summary',
  'issuetype',
  'priority',
  'status',
  'updated',
  'assignee',
  'due'
];
