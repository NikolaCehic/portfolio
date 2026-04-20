import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { App } from '../App';

describe('App', () => {
  it('renders every section heading', () => {
    render(<App />);
    expect(screen.getByText(/cat about\.md/i)).toBeInTheDocument();
    expect(screen.getByText(/tree \.\/stack/i)).toBeInTheDocument();
    expect(screen.getByText(/experience\.log/i)).toBeInTheDocument();
    expect(screen.getByText(/get_in_touch\.sh/i)).toBeInTheDocument();
  });

  it('renders the top-bar nav with all sections', () => {
    render(<App />);
    const nav = screen.getByRole('navigation', { name: /primary/i });
    expect(nav).toHaveTextContent('index');
    expect(nav).toHaveTextContent('about');
    expect(nav).toHaveTextContent('stack');
    expect(nav).toHaveTextContent('experience');
    expect(nav).toHaveTextContent('contact');
  });

  it('renders the resume link with absolute public path', () => {
    render(<App />);
    const resumeLinks = screen
      .getAllByRole('link')
      .filter((a) => a.getAttribute('href') === '/Nikola-Cehic-CV.pdf');
    expect(resumeLinks.length).toBeGreaterThan(0);
  });
});
