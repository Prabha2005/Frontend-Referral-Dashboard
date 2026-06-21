import "./index.css"

const ShareReferral = ({referral}) => {
    const copyLink = () => {
        navigator.clipboard.writeText(referral.link);
    };
    const copyCode = () => {
    navigator.clipboard.writeText(referral.code);
};

    return (
        <section className="share-section">
            <h2> Refer friends and earn more </h2>

            <div className="share-grid">
                <div className="share-item">
                    <label>Your Referral Link </label>

                    <div className="copy-container">
                    <input
                    type="text"
                    value={referral.link}
                    readOnly
                    />
                    <button type="button" onClick={copyLink}>
                        Copy
                    </button>
                    </div>
                    </div> 

                    <div className="share-item">
                        <label>Your Referral Code</label>
                        <div className="copy-container">
                            <input
                            type="text"
                            value={referral.code}
                            readOnly
                            />
                            <button type="button" onClick={copyCode}>Copy</button>
                        </div>
                    </div>


            </div>
        </section>
    );
};

export default ShareReferral;

/*

File: src/components/ShareReferral/index.js

Line 1:
Imports the CSS file associated with the ShareReferral component.

Purpose:
Contains styling rules for the referral sharing section.

Line 3:
Defines a functional component named ShareReferral.

Code:
const ShareReferral = ({ referral }) => {

Purpose:
Creates a reusable component that allows users to view and copy their referral link and referral code.

Line 3:
Receives a prop named referral.

Purpose:
Contains referral-related information passed from the parent component.

Example:

{
link: "https://gobusiness.com/ref/ABC123",
code: "ABC123"
}

Line 4:
Defines a function named copyLink.

Purpose:
Copies the referral link to the user's clipboard.

Line 5:
Uses the Clipboard API.

Code:
navigator.clipboard.writeText(referral.link);

Purpose:
Copies the referral URL without requiring the user to manually select the text.

Example:

Copied:
https://gobusiness.com/ref/ABC123

Line 6:
Closes the copyLink function.

Line 7:
Defines a function named copyCode.

Purpose:
Copies the referral code to the clipboard.

Line 8:
Uses the Clipboard API.

Code:
navigator.clipboard.writeText(referral.link);

Purpose:
Copies text to the clipboard.

Issue Found:

The function is intended to copy the referral code but currently copies the referral link.

Current Code:

navigator.clipboard.writeText(referral.link);

Correct Code:

navigator.clipboard.writeText(referral.code);

Reason:
The second input displays referral.code, so the copy function should copy the same value.

Line 9:
Closes the copyCode function.

Line 11:
Starts the JSX returned by the component.

Line 12:
Creates a section element.

Class:
share-section

Purpose:
Groups all referral-sharing functionality together.

Line 13:
Displays the section heading.

Output:
Refer friends and earn more

Purpose:
Encourages users to share referral information.

Line 15:
Creates a container for referral-sharing items.

Class:
share-grid

Purpose:
Organizes referral information into a structured layout.

---

First Share Item

Line 16:
Creates a container for the referral link.

Class:
share-item

Purpose:
Displays the referral URL.

Line 17:
Displays a label.

Output:
Your Referral Link

Purpose:
Identifies the value shown below.

Line 19:
Creates a copy container.

Class:
copy-container

Purpose:
Groups the input field and copy button together.

Line 20-24:
Creates a read-only input field.

Code:

<input
 type="text"
 value={referral.link}
 readOnly
/>

Purpose:
Displays the referral link.

Why readOnly?

Users can copy the value but cannot accidentally modify it.

Line 25:
Creates a button.

Purpose:
Allows users to copy the referral link.

Line 25:
Attaches the copyLink function.

Code:
onClick={copyLink}

Purpose:
Copies the referral URL when clicked.

Line 26:
Displays button text.

Output:
Copy

Line 27:
Closes the button.

Line 28:
Closes the copy container.

Line 29:
Closes the share item.

---

Second Share Item

Line 31:
Creates another share item container.

Purpose:
Displays the referral code.

Line 32:
Displays a label.

Current Output:
Your Referral Link

Issue Found:

This section displays the referral code, not the referral link.

Recommended Label:

Your Referral Code

Reason:
Improves clarity for users.

Line 33:
Creates a copy container.

Purpose:
Groups referral code input and copy button.

Line 34-38:
Creates a read-only input field.

Code:

<input
 type="text"
 value={referral.code}
 readOnly
/>

Purpose:
Displays the referral code.

Example:

ABC123

Line 39:
Creates a button.

Purpose:
Allows users to copy the referral code.

Line 39:
Attaches the copyCode function.

Code:
onClick={copyCode}

Purpose:
Copies the referral code to the clipboard.

Line 39:
Displays button text.

Output:
Copy

Line 40:
Closes the button.

Line 41:
Closes the copy container.

Line 42:
Closes the share item.

---

Line 45:
Closes the share-grid container.

Line 46:
Closes the section element.

Line 47:
Ends the return statement.

Line 48:
Closes the ShareReferral component.

Line 50:
Exports ShareReferral as the default export.

Purpose:
Allows the component to be imported and used in other files.

---

Purpose of this File

This component provides referral-sharing functionality within the dashboard. It displays the user's referral link and referral code and allows both values to be copied directly to the clipboard using the browser's Clipboard API.

---

Expected Data Flow

Dashboard
↓
referral Object
↓
ShareReferral Component
↓
Referral Link & Code Displayed

---

Example Data

const referral = {
link: "https://gobusiness.com/ref/ABC123",
code: "ABC123"
};

---

Rendered Output

Refer friends and earn more

---

Your Referral Link

https://gobusiness.com/ref/ABC123

[ Copy ]

---

Your Referral Code

ABC123

[ Copy ]

---

---

Why Clipboard API Was Used

Code:

navigator.clipboard.writeText(...)

Benefits:

1. Fast user experience.
2. No manual text selection.
3. One-click copying.
4. Common pattern in referral systems.

---

Issues Found

Issue 1:

Current:

const copyCode = () => {
navigator.clipboard.writeText(referral.link);
};

Problem:

Copies referral link instead of referral code.

Fix:

const copyCode = () => {
navigator.clipboard.writeText(referral.code);
};

---

Issue 2:

Current Label:

<label>Your Referral Link</label>

Problem:

Used for the referral code section.

Fix:

<label>Your Referral Code</label>

Reason:

Improves readability and user understanding.

---

Interview Explanation

What is the purpose of the ShareReferral component?

The ShareReferral component allows users to easily share referral information. It displays both the referral link and referral code and provides copy buttons so users can quickly copy and share them with others.

Why did you use the Clipboard API?

I used the Clipboard API to improve user experience. Instead of manually selecting text, users can copy referral information with a single click, making the sharing process faster and more convenient.


*/