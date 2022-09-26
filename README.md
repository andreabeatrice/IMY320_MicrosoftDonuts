# IMY 320 Web Project Proposal & Concept
### 🍩Microsoft Donuts🍩

- Jarod Jeffery       u18003193
- [Andrea Blignaut     u19130938](https://github.com/andreabeatrice)
- [Caleb Groeneveld    u19340631](https://github.com/u19340631) 
- Cassim Chifamba     u19024895
- Liezelle Mmako      u19111798

### Introduction
This is an early proposal for a UX Portfolio Website—essentially an online CV for a content creation group. It needs to be engaging, so that users will feel confident in hiring the group to create engaging content on their behalf.

For the proposal, we will be following the format set by the University of Pretoria Multimedia Department (Ka 2022).

### Needs Identification
The website should serve as a way for the content creation company to share their services to as wide of an audience as possible with minimum effort. It should also serve as a way for users to get the information they want about the company as fast as possible, and contact them as painlessly as possible (Siang 2020).

### User Identification
The key user base of this website would be people who need to hire someone to create web content for them. This could be split into a couple of key groups:
 1. Programmers who have an application created, but need to implement a GUI that users will enjoy working with.
 2. Small business owners who are looking to promote their business online but aren’t technically savvy and are struggling to do it themselves.
 3. People looking to improve already existing websites/other digital content by consulting professionals.

### User Needs
Based on the user groups described above, the website must, at least:
 1. Allow users to contact the group.
 2. Show previews of projects, and include links so that users can see the projects in full.
 3. Include complicated projects (like the large showcase) in order to assure technologically competent users that the company can cater to their needs.
 4. Be simple enough that users who are not familiar with internet content don’t feel overwhelmed and give up.

## Conceptual Design
### Layout
Our initial concept uses a “Scrolling Site” format— as a format that arose in late Web 2.0 & interactive web design, it is likely to feel very “modern” to a general user, thus impressing on them the company’s skill from the moment they open the website (Clark 2022). It is important to note that the use of a scrolling site format also adheres to Jakob’s Law. Users expect websites to look like ones they’ve interacted with in the past, and not only is the scrolling website one of “the most popular and effective ways of delivering content on the internet”, but it also follows the format of many other UX/design portfolio sites (Stevens 2022).

We also prefer this approach because it requires less sorting between tabs. When using this style, data is processed and delivered more efficiently, as a user can navigate the entire sitewithout ever having to search for a page, or wait for loading time. A summary of research papers on good website design elements found that navigation was consistently the most important element in increasing user engagement (Garett et al. 2016), and this layout ensures a consistent navigation bar that allows easy access to all sections of the site and still allows users to feel in control by aiding navigation through the use of colour to highlight the user’s current position on the page.

To avoid having the same information repeated on several pages, the website's menu does not scroll down with the rest of the content. The scanning process and the comprehension process are both technical barriers by the duplication of features. Users will also spend additional time determining whether a duplication is a new or an old feature because they can't always tell when a feature is copied.

A last important point to note about this layout is that it ensures transparency of information—any user accessing the website for the first time can immediately see a summary of the contents of the website.

### Colours
Our “base” colours, `#F4EBDB` /Eggshell and `#1C1C1C`/Eerie Black (which apply to the page background and the body text respectively) were chosen first; eggshell taken from a picture of donut pastry, and eerie black generated by starting at black and going steadily lighter until we found a colour that was still readable but didn’t include a painful contrast.

The next three colours ( `#00A8FF`/Blue Jeans, `#753001`/Chocolate, and `#EF35C0`/Shocking Pink) were chosen to fit with the overarching theme of the website—they are vibrant and dynamic, hopefully conveying to the users the energy and passion of the designers and company as a whole. They also incorporated the colours that reoccur in the first pictures Google Images returns when a user searches donut (fig. 1), which should help the user to understand the colour scheme based on their knowledge of the world (essentially— *“oh, this company is called Microsoft Donuts, and their colour scheme is very donut-like”*).


<sub>Figure 1: Screenshot of the first two lines of images that come up when a user searches “donut” on Google Images</sub>


### References
Clark, C. 2022. The Rise of The Scrolling Site. awwwards . Available at: https://www.awwwards.com/the-rise-of-the-scrolling-site.html [Accessed: 26 August 2022].
Garett, R. et al. 2016. A Literature Review: Website Design and User Engagement. Online Journal of Communication and Media Technologies 6(3), pp. 1-14. Available at: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4974011/.
Siang, T. 2020. What Should a UX Design Portfolio Contain?. Available at: https://www.interaction-design.org/literature/article/what-should-a-ux-design-portfolio-contain [Accessed: 26 August 2022].
Stevens, E. 2022. The 9 Best UX Design Portfolio Examples (Updated For 2022). Available at: https://careerfoundry.com/en/blog/ux-design/ux-portfolio-examples-inspiration/ [Accessed: 26 August 2022].

## Heroku Shit
* Download https://devcenter.heroku.com/articles/heroku-cli
* ```heroku login``` (sign in using microsoftdonuts@yahoo.com + password on Google Drive)
* ```heroku git:clone -a microsoft-donuts-portfolio```
* ```cd microsoft-donuts-portfolio```
* make changes
* ```git add .```
* ```git commit -am "make it better"```
* ```git push heroku main```
* ```heroku open```
