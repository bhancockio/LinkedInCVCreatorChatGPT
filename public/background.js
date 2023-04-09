/*global chrome*/

const linkedInListViewURL = "https://www.linkedin.com/jobs/collections";
const linkedInDetailView = "https://www.linkedin.com/jobs/view/";

console.log("backgorund js");

function getJobDescriptionClassName(url) {
  return url.startsWith(linkedInListViewURL)
    ? "jobs-search__job-details--container"
    : "jobs-description-content__text";
}

function grabJobDescription(className) {
  const jobDetailsContainer = document.body.querySelector(`.${className}`);
  const jobDetails = jobDetailsContainer.textContent;
  const cleanedJobDetails = jobDetails.replace(/\s\s+/g, " ");
  return cleanedJobDetails;
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.active) {
    console.log("tab.url", tab.url);
    if (
      tab.url.startsWith(linkedInListViewURL) ||
      tab.url.startsWith(linkedInDetailView)
    ) {
      chrome.scripting
        .executeScript({
          target: { tabId: tab.id },
          func: grabJobDescription,
          args: [getJobDescriptionClassName(tab.url)],
        })
        .then((queryResult) => {
          console.log("Job Description: ", queryResult[0].result);
          chrome.storage.local.set({ jobDescription: queryResult[0].result });
        });
    }
  }
});
