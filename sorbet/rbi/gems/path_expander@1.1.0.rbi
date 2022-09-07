# typed: true

# DO NOT EDIT MANUALLY
# This is an autogenerated file for types exported from the `path_expander` gem.
# Please instead update this file by running `bin/tapioca gem path_expander`.

# PathExpander helps pre-process command-line arguments expanding
# directories into their constituent files. It further helps by
# providing additional mechanisms to make specifying subsets easier
# with path subtraction and allowing for command-line arguments to be
# saved in a file.
#
# NOTE: this is NOT an options processor. It is a path processor
# (basically everything else besides options). It does provide a
# mechanism for pre-filtering cmdline options, but not with the intent
# of actually processing them in PathExpander. Use OptionParser to
# deal with options either before or after passing ARGV through
# PathExpander.
class PathExpander
  # Create a new path expander that operates on args and expands via
  # glob as necessary. Takes an optional +path+ arg to fall back on if
  # no paths are found on the initial scan (see #process_args).
  #
  # @return [PathExpander] a new instance of PathExpander
  def initialize(args, glob, path = T.unsafe(nil)); end

  # The args array to process.
  def args; end

  # The args array to process.
  def args=(_arg0); end

  # Takes an array of paths and returns an array of paths where all
  # directories are expanded to all files found via the glob provided
  # to PathExpander.
  def expand_dirs_to_files(*dirs); end

  # A file filter mechanism similar to, but not as extensive as,
  # .gitignore files:
  #
  # + If a pattern does not contain a slash, it is treated as a shell glob.
  # + If a pattern ends in a slash, it matches on directories (and contents).
  # + Otherwise, it matches on relative paths.
  #
  # File.fnmatch is used throughout, so glob patterns work for all 3 types.
  #
  # Takes a list of +files+ and either an io or path of +ignore+ data
  # and returns a list of files left after filtering.
  def filter_files(files, ignore); end

  # The glob used to expand dirs to files.
  def glob; end

  # The glob used to expand dirs to files.
  def glob=(_arg0); end

  # The path to scan if no paths are found in the initial scan.
  def path; end

  # The path to scan if no paths are found in the initial scan.
  def path=(_arg0); end

  # Top-level method processes args. It replaces args' contents with a
  # new array of flags to process and returns a list of files to
  # process. Eg
  #
  #     PathExpander.new(ARGV).process.each do |f|
  #       puts "./#{f}"
  #     end
  def process; end

  # Enumerate over args passed to PathExpander and return a list of
  # files and flags to process. Arguments are processed as:
  #
  # -file_path    :: Subtract path from file to be processed.
  # -dir_path     :: Expand and subtract paths from files to be processed.
  # -not_a_path   :: Add to flags to be processed.
  # dir_path      :: Expand and add to files to be processed.
  # file_path     :: Add to files to be processed.
  #
  # See expand_dirs_to_files for details on how expansion occurs.
  #
  # Subtraction happens last, regardless of argument ordering.
  #
  # If no files are found (which is not the same as having an empty
  # file list after subtraction), then fall back to expanding on the
  # default #path given to initialize.
  def process_args; end

  # Process a file into more arguments. Override this to add
  # additional capabilities.
  def process_file(path); end

  # Process over flags and treat any special ones here. Returns an
  # array of the flags you haven't processed.
  #
  # This version does nothing. Subclass and override for
  # customization.
  def process_flags(flags); end
end

PathExpander::VERSION = T.let(T.unsafe(nil), String)