# Portfolio UI Optimization & Advanced Resume Modal

This plan outlines the specific changes to resolve performance bottlenecks, layout misalignment, update the contact section, and implement a highly advanced, deep-tech resume viewer and upload modal.

## User Review Required

Please review the proposed architecture for the advanced `ResumeModal.jsx` and the state-lifting strategy in `App.jsx` to ensure it aligns with your vision.

## Open Questions

None at this time. All requirements are clear.

## Proposed Changes

### App & State Management
- Lift the `isModalOpen` state from `TopNav.jsx` up to `App.jsx`.
- Pass down `onOpenResume` to both `TopNav` and `HomeSection` so the Resume modal can be triggered from the prominent hero button and the top navigation.
- Render `<ResumeModal>` from `App.jsx` instead of `TopNav.jsx`.

#### [MODIFY] [App.jsx](file:///c:/Projects/Portfolio/src/App.jsx)
- Add `isResumeOpen` state.
- Pass `onOpenResume` to `<TopNav>` and `<HomeSection>`.
- Mount `<ResumeModal>` alongside the other sections.

### Components

#### [MODIFY] [BinaryRain.jsx](file:///c:/Projects/Portfolio/src/components/BinaryRain.jsx)
- **Performance Optimization**: Re-introduce the `active` prop. 
- The component will only execute the `spawnWave` interval when `active={true}`. 
- When `active={false}`, the interval is cleared, saving background computation, while allowing existing characters to fall and fade naturally.

#### [MODIFY] [TopNav.jsx](file:///c:/Projects/Portfolio/src/components/TopNav.jsx)
- Accept `onOpenResume` as a prop and remove its internal modal state and `<ResumeModal />` mounting logic.

#### [MODIFY] [ResumeModal.jsx](file:///c:/Projects/Portfolio/src/components/ResumeModal.jsx)
- **Dual-Pane Interface**: Redesign the entire modal. Increase its `max-w` to `max-w-4xl` or `max-w-5xl` to accommodate the dual-pane layout.
- **Left Pane (Interactive Dropzone & Preview)**: Implement an `onDrop` and file input handler.
  - If no file is loaded, show a glowing dashed-border dropzone.
  - On file drop, use `URL.createObjectURL(file)`.
  - Render a visual preview depending on MIME type (`<object>` for PDF, `<img>` for images, or a fallback UI for unsupported types like `.docx`).
- **Right Pane (Metadata & Actions)**: 
  - Dynamic mock metadata (File size, Format, Security status).
  - Primary Action: "Open in new tab" using `target="_blank" href={previewUrl}`.
  - Secondary Action: "Download Resume".

### Sections

#### [MODIFY] [AboutSection.jsx](file:///c:/Projects/Portfolio/src/sections/AboutSection.jsx)
- Wrap the Biography and Education glass cards in `onMouseEnter` / `onMouseLeave` handlers to manage a local `hoveredCard` state.
- Pass `active={hoveredCard === 'bio'}` and `active={hoveredCard === 'edu'}` to their respective `<BinaryRain />` components.

#### [MODIFY] [SkillsSection.jsx](file:///c:/Projects/Portfolio/src/sections/SkillsSection.jsx)
- **Alignment Fix**: Apply strict centering utility classes (`max-w-5xl mx-auto flex flex-col items-center justify-center text-center`) to the primary container to ensure the "Technical Arsenal" is properly centered.
- Update `<h4>` titles inside the grid to also be centered (`justify-center`).
- Manage `onMouseEnter` / `onMouseLeave` to conditionally activate `<BinaryRain />`.

#### [MODIFY] [HomeSection.jsx](file:///c:/Projects/Portfolio/src/sections/HomeSection.jsx)
- Accept `onOpenResume` as a prop.
- **Primary Button**: Change the GitHub button or add a new, highly prominent, scaled-up "View Resume" button alongside the "View my work" and "Get in touch" actions, hooking it up to `onOpenResume`.

#### [MODIFY] [ContactSection.jsx](file:///c:/Projects/Portfolio/src/sections/ContactSection.jsx)
- Remove the `Phone` object from the `CONTACT` array.
- Inject the `Linkedin` (Lucide React icon) object, setting the label to "Connect with me" and the URL to the provided LinkedIn link.

## Verification Plan
1. **Performance**: Verify `BinaryRain` actively stops spawning nodes in the React DevTools or performance profiler when not hovered.
2. **Alignment**: Check layout centering across `SkillsSection`.
3. **Advanced Modal**: 
   - Upload a local `.pdf` or `.png`.
   - Ensure the preview renders successfully in the Left Pane.
   - Click "Open in new tab" to verify the `URL.createObjectURL` blob opens cleanly.
